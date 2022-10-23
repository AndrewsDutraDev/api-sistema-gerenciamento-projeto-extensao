import { projectExists, newProject, deleteOneProject } from '../models/projeto.model';

const createProject = async ({
  title, extensionCenter, unity, modality, mainArea, secondArea,
  sustainableGoals, coordinatorName, coordinatorId, contactEmail,
  abstract, startDate, endDate, goals, usefulLinks, address, workload,
  methodology, duration, isVisible
}) => {
  const projectExist = await projectExists({ title, coordinatorId });
  if (projectExist) return projectExist;

  const project = await newProject({
    title, extensionCenter, unity, modality, mainArea, secondArea,
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

export { createProject, toDelete };
