import { todos, createUser } from '../services/usuario.services';

const getAll = async (req, res) => {
  const users = await todos();
  return res.status(200).json(users);
};

const createNewUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await createUser({ email, password });
  return res.status(200).json(user);
};

const login = async () => null;

export { getAll, login, createNewUser };
