import { Router } from 'express';
import { getAll, createNewUser } from '../controller/usuario.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

routes.post('/registrar', createNewUser);

routes.get('/usuario', getAll);

export default routes;
