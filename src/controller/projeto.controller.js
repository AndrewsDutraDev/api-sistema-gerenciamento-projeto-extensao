import { createProject, toDelete, getAllProjects, toUpdateProject, toFindProject } from '../services/projeto.services';

const getProjects = async (req, res) => {
  const projects = await getAllProjects();

  return res.status(200).json(projects);
};

const createNewProject = async (req, res) => {
  const {
    title, unity, modality, mainArea, secondArea,
    sustainableGoals, coordinatorName, coordinatorId, contactEmail,
    abstract, startDate, endDate, goals, usefulLinks, address, workload,
    methodology, duration, isVisible
  } = req.body;
  const project = await createProject({
    title, unity, modality, mainArea,
    secondArea, sustainableGoals, coordinatorName, coordinatorId,
    contactEmail, abstract, startDate, endDate, goals, usefulLinks,
    address, workload, methodology, duration, isVisible
  });
  return res.status(200).json({ project });
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await toDelete({ id });
  return res.status(200).json(project);
};

const updateProject = async (req, res) => {
  const {
    title, unity, modality, mainArea, secondArea, sustainableGoals,
    coordinatorName, coordinatorId, contactEmail, abstract,
    startDate, endDate, goals, usefulLinks, address, workload,
    methodology, duration, isVisible
  } = req.body;
  const { id } = req.params;

  const projectUpdate = await toUpdateProject({
    id, title, unity, modality, mainArea, secondArea, sustainableGoals,
    coordinatorName, coordinatorId, contactEmail, abstract,
    startDate, endDate, goals, usefulLinks, address, workload,
    methodology, duration, isVisible
  });
  return res.status(200).json(projectUpdate);
};

const getOneProject = async (req, res) => {
  const { id } = req.params;
  const project = await toFindProject({ id });
  return res.status(200).json(project);
};

export { createNewProject, deleteProject, getProjects, updateProject, getOneProject };
