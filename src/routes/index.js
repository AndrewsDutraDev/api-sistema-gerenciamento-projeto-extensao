import { Router } from 'express';
import { getAll } from '../controller/usuario.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

routes.get('/usuario', getAll);

export default routes;
