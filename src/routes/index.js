import { Router } from 'express';
import { getAll, createNewUser, deleteUser, updateUser } from '../controller/usuario.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

routes.post('/registrar', createNewUser);

routes.get('/usuarios', getAll);

routes.delete('/usuarios/:id', deleteUser);

routes.put('/usuarios/:id', updateUser);

export default routes;
