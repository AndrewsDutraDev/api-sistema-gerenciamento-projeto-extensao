import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import connection from './mongoConnection';

const projectExists = async ({ title, coordinatorId, id }) => {
  const db = await connection();
  let project = null;
  if (id) {
    project = await db.collection('projects').findOne({ _id: ObjectId(id) });
  } else {
    project = await db.collection('projects').findOne({ title, coordinatorId });
  }

  return project;
};

const newProject = async ({
  title, extensionCenter, unity, modality, mainArea, secondArea, sustainableGoals, coordinatorName,
  coordinatorId, contactEmail, abstract, startDate, endDate, goals, usefulLinks, address, workload,
  methodology, duration, isVisible }) => {
  const db = await connection();
  const project = await db.collection('projects').insertOne({
    title, extensionCenter, unity, modality, mainArea, secondArea, sustainableGoals,
    coordinatorName, coordinatorId, contactEmail, abstract,
    startDate, endDate, goals, usefulLinks, address, workload,
    methodology, duration, isVisible
  });
  const { insertedId: id } = project;
  return { _id: id };
};

const deleteOneProject = async ({ id }) => {
  const db = await connection();
  await db.collection('projects').deleteOne({ _id: ObjectId(id) });
  return { id };
};

export { projectExists, newProject, deleteOneProject };
