import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const getAll = async () => {
  const db = await connection();
  return db.collection('users').find().toArray();
};

const newUser = async ({ email, password }) => {
  const db = await connection();
  const user = await db.collection('users').insertOne({ email, password });
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

const updateOneUser = async ({ id, email, password }) => {
  const db = await connection();
  await db.collection('users').updateOne({ _id: ObjectId(id) }, { $set: { email, password } });
  return { id, email };
};

const login = async () => null;

export { getAll, login, newUser, userExists, deleteOneUser, updateOneUser };
