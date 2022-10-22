import { Router } from 'express';
import { requestLogin } from '../models/user.model';
import {
  getAll, createNewUser, deleteUser, updateUser,
} from '../controller/usuario.controller';

import VerifyToken from '../middleware/usuario.middleware';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

routes.post('/registrar', VerifyToken, createNewUser);

routes.get('/usuarios', VerifyToken, getAll);

routes.get('/login', requestLogin);

routes.delete('/usuarios/:id', VerifyToken, deleteUser);

routes.put('/usuarios/:id', VerifyToken, updateUser);

export default routes;
