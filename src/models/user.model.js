import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import connection from './mongoConnection';
import bcrypt from 'bcrypt';

const SECRET = 'andrews250500';

const getAll = async () => {
  const db = await connection();
  return db.collection('users').find().toArray();
};

const newUser = async ({ email, password, role, name }) => {
  const db = await connection();
  const salt = await bcrypt.genSalt(15);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await db.collection('users').insertOne({ email, password: hashedPassword, role, name });
  const { insertedId: id } = user;
  return { email, _id: id };
};

const userExists = async ({ email, id }) => {
  const db = await connection();
  let user = null;
  if (id) {
    user = await db.collection('users').findOne({ _id: ObjectId(id) });
  } else {
    user = await db.collection('users').findOne({ email });
  }
  return user;
};

const deleteOneUser = async ({ id }) => {
  const db = await connection();
  await db.collection('users').deleteOne({ _id: ObjectId(id) });
  return { id };
};

const updateOneUser = async ({ id, email, password, role, name }) => {
  const db = await connection();
  await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { email, password, role, name } });
  return { id, email };
};

const findOneUser = async ({ id }) => {
  const db = await connection();
  return db.collection('users').findOne({ _id: ObjectId(id) });
};

const login = async ({ email, password }) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  let validPassword;
  if (user) {
    validPassword = await bcrypt.compare(password, user.password, null);
  }
  if (validPassword) {
    return true;
  }
  return null;
};

const requestLogin = async (req, res) => {
  const { email, password } = req.body;
  const usuario = await login({ email, password });

  if (!usuario) return res.status(401).json({ message: 'Usuário não encontrado' });
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  const user_email = user.email;
  const { _id, name, role } = user;

  const newToken = jwt.sign(
    {
      userId: _id,
      email,
    },
    SECRET,
    {
      expiresIn: 86400,
    },
  );
  return res.status(200).json({ token: newToken, user_email, name, role, id: _id });
};

export { getAll, login, newUser, userExists, deleteOneUser, updateOneUser, requestLogin, findOneUser };
