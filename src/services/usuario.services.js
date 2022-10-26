import { getAll, newUser, userExists, deleteOneUser, updateOneUser, findOneUser } from '../models/user.model';

const todos = async () => {
  const users = await getAll();
  // Devolve pro controller
  return users;
};

const createUser = async ({ email, password, role, name }) => {
  const userExist = await userExists({ email });
  if (userExist) return userExist;

  const user = await newUser({ email, password, role, name });
  return user;
};

const toDelete = async (id) => {
  const userExist = await userExists({ id });
  if (!userExist) return { message: 'Usuário não encontrado' };
  const user = await deleteOneUser({ id });
  return user;
};

const toUpdate = async ({ id, email, password, role, name}) => {
  const userExist = await userExists({ id });
  if (!userExist) return { message: 'Usuário não encontrado' };

  const user = await updateOneUser({ id, email, password, role, name })
  return user;
};

const toFindUser = async (id) => {
  const userExist = await userExists({ id });
  if (!userExist) return { message: 'Projeto não encontrado' };
  const project = await findOneUser({ id });
  return project;
};

const login = async () => null;

export { todos, createUser, login, toDelete, toUpdate, toFindUser };
