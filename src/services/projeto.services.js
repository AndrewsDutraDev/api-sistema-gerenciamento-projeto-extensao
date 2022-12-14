import { getAll, projectExists, newProject, deleteOneProject, updateOneProject, findOneProject, getAllSearch } from '../models/projeto.model';

const getAllProjects = async () => {
  const projects = await getAll();
  return projects;
};

const getAllProjectsSearch = async (data) => {
  const projects = await getAllSearch(data);
  return projects;
};

const createProject = async ({
  title, unity, modality, mainArea, secondArea,
  sustainableGoals, coordinatorName, coordinatorId, contactEmail,
  abstract, startDate, endDate, goals, usefulLinks, address, workload,
  methodology, duration, isVisible
}) => {
  const projectExist = await projectExists({ title, coordinatorId });
  if (projectExist) return projectExist;

  const project = await newProject({
    title, unity, modality, mainArea, secondArea,
    sustainableGoals, coordinatorName, coordinatorId, contactEmail,
    abstract, startDate, endDate, goals, usefulLinks, address, workload,
    methodology, duration, isVisible
  });
  return project;
};

const toDelete = async (id) => {
  const projectExist = await projectExists({ id });
  if (!projectExist) return { message: 'Projeto não encontrado' };
  const project = await deleteOneProject({ id });
  return project;
};

const toUpdateProject = async ({
  id, title, unity, modality, mainArea, secondArea, sustainableGoals,
  coordinatorName, coordinatorId, contactEmail, abstract,
  startDate, endDate, goals, usefulLinks, address, workload,
  methodology, duration, isVisible
}) => {
  const userExist = await projectExists({ id });
  if (!userExist) return { message: 'Usuário não encontrado' };

  const user = await updateOneProject({
    id, title, unity, modality, mainArea, secondArea, sustainableGoals,
    coordinatorName, coordinatorId, contactEmail, abstract,
    startDate, endDate, goals, usefulLinks, address, workload,
    methodology, duration, isVisible
  });
  return user;
};

const toFindProject = async (id) => {
  const projectExist = await projectExists({ id });
  if (!projectExist) return { message: 'Projeto não encontrado' };
  const project = await findOneProject({ id });
  return project;
};

export { getAllProjects, createProject, toDelete, toUpdateProject, toFindProject, getAllProjectsSearch };
