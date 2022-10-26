import { todos, createUser, toDelete, toUpdate, toFindUser } from '../services/usuario.services';

const getAll = async (req, res) => {
  const users = await todos();
  const id = '_id';

  const newList = users.map((user) => (
    {
      email: user.email,
      _id: user[`${id}`],
      role: user.role,
      name: user.name,
    }
  ));

  return res.status(200).json(newList);
};

const createNewUser = async (req, res) => {
  const { email, password, role, name } = req.body;
  const { email: mail, _id } = await createUser({ email, password, role, name });
  return res.status(200).json({ mail, _id });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await toDelete({ id });
  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { email, password, role, name } = req.body;
  const { id } = req.params;

  const userUpdate = await toUpdate({ id, email, password, role, name });
  return res.status(200).json(userUpdate);
};

const getOneUser = async (req, res) => {
  const { id } = req.params;
  const user = await toFindUser({ id });
  return res.status(200).json(user);
};

const login = async () => null;

export { getAll, login, createNewUser, deleteUser, updateUser, getOneUser };
