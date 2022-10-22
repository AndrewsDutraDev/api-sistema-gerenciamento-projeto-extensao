import { getAll } from '../models/user.model';

const todos = async () => {
  const users = await getAll();
  // Devolve pro controller
  return users;
};

const login = async () => null;

export { todos, login };
