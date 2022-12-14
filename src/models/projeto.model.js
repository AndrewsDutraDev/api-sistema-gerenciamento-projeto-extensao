import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import connection from './mongoConnection';

const getAll = async () => {
  const db = await connection();
  return db.collection('projects').find().toArray();
};

const getAllSearch = async (data) => {
  const db = await connection();
  const dataFields = [];
	var titulo
  for (const [key, value] of Object.entries(data)) {
    if (value && key != "title") {
			dataFields.push({
				[key]: { $eq: value }
			})
		}
		if (value && key == "title"){
			titulo = value
		}
	}
	if (dataFields.length && !titulo){
		return db.collection('projects').find({
			$and: dataFields,
		}).toArray();
	}
	if (dataFields.length && titulo){
		return db.collection('projects').find({
			$and: dataFields,
			title: new RegExp(titulo, 'i')
		}).toArray();
	}
	if (!dataFields.length && titulo){
		return db.collection('projects').find({
			title: new RegExp(titulo, 'i')
		}).toArray();
	}
	return dataFields

};

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
  title, unity, modality, mainArea, secondArea, sustainableGoals, coordinatorName,
  coordinatorId, contactEmail, abstract, startDate, endDate, goals, usefulLinks, address, workload,
  methodology, duration, isVisible }) => {
  const db = await connection();
  const project = await db.collection('projects').insertOne({
    title, unity, modality, mainArea, secondArea, sustainableGoals,
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

const updateOneProject = async ({
  id, title, unity, modality, mainArea, secondArea, sustainableGoals,
  coordinatorName, coordinatorId, contactEmail, abstract,
  startDate, endDate, goals, usefulLinks, address, workload,
  methodology, duration, isVisible
}) => {
  const db = await connection();
  await db.collection('projects').updateOne({ _id: ObjectId(id) }, { $set: {
    title, unity, modality, mainArea, secondArea, sustainableGoals,
    coordinatorName, coordinatorId, contactEmail, abstract,
    startDate, endDate, goals, usefulLinks, address, workload,
    methodology, duration, isVisible } });
  return { id, title, coordinatorId };
};

const findOneProject = async ({ id }) => {
  const db = await connection();
  return db.collection('projects').findOne({ _id: ObjectId(id) });
};

export { projectExists, newProject, deleteOneProject, getAll, updateOneProject, findOneProject, getAllSearch };
