import { todos, createUser, toDelete, toUpdate } from '../services/usuario.services';

const getAll = async (req, res) => {
  const users = await todos();
  const id = '_id';

  const newList = users.map((user) => (
    {
      email: user.email,
      _id: user[`${id}`],
    }
  ));

  return res.status(200).json(newList);
};

const createNewUser = async (req, res) => {
  const { email, password } = req.body;
  const { email: mail, _id } = await createUser({ email, password });
  return res.status(200).json({ mail, _id });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await toDelete({ id });
  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.params;

  const userUpdate = await toUpdate({ id, email, password });
  return res.status(200).json(userUpdate);
};

const login = async () => null;

export { getAll, login, createNewUser, deleteUser, updateUser };
