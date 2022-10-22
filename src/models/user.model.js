import connection from './mongoConnection';
import { v4 as newUuid } from 'uuid';

const getAll = async () => {
  const db = await connection();
  return db.collection('users').find().toArray();
};

const newUser = async ({ email, password }) => {
  const db = await connection();
  const uuid = newUuid();
  await db.collection('users').insertOne({ email, password, uuid });
  return { email, uuid };
};

const userExists = async ({ email, uuid }) => {
  const db = await connection();
  let user = null;
  if (uuid) {
    user = await db.collection('users').findOne({ uuid });
  } else {
    user = await db.collection('users').findOne({ email });
  }
  return user;
};

const login = async () => null;

export { getAll, login, newUser, userExists };
