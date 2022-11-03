import { Router } from 'express';
import { requestLogin } from '../models/user.model';
import {
  getAll, createNewUser, deleteUser, updateUser, getOneUser,
} from '../controller/usuario.controller';

import { getProjects, createNewProject, deleteProject, updateProject, getOneProject, getProjectsSearched } from '../controller/projeto.controller';

import VerifyToken from '../middleware/usuario.middleware';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

routes.post('/registrar', VerifyToken, createNewUser);

routes.get('/usuarios', VerifyToken, getAll);

routes.get('/usuarios/:id', VerifyToken, getOneUser);

routes.post('/login', requestLogin);

routes.delete('/usuarios/:id', VerifyToken, deleteUser);

routes.put('/usuarios/:id', VerifyToken, updateUser);

// Projetos

routes.get('/projetos', getProjects);

routes.post('/busca-projetos', getProjectsSearched);

routes.get('/projetos/:id', getOneProject);

routes.post('/projetos/novo', createNewProject);

routes.delete('/projetos/:id', deleteProject);

routes.put('/projetos/:id', updateProject);

export default routes;
