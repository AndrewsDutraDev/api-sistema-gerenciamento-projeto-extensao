import { getAll, newUser, userExists } from '../models/user.model';

const todos = async () => {
  const users = await getAll();
  // Devolve pro controller
  return users;
};

const createUser = async ({ email, password }) => {
  const userExist = await userExists({ email });
  if (userExist) return userExist;

  const user = await newUser({ email, password });
  return user;
};

const login = async () => null;

export { todos, createUser, login };
