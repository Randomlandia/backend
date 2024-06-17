const Sandia = require("../models/sandia.model");
const Topic = require("../models/topics.model");
const ObjectId = require("mongodb").ObjectId;
const createError = require("http-errors");

// traer todas ♥ listo ♥
async function getAll() {
  const sandias = await Sandia.find().populate("topic");
  if (!sandias) {
    throw createError(404, "no sandias found");
  }

  return sandias;
}

// traer por id ♥ listo ♥
async function getById(id) {
  const sandia = await Sandia.findById(id).populate("topic");

  if (!sandia) {
    throw createError(404, "no sandia found");
  }
  const destructuredSandia = {
    id: sandia._id,
    topicName: sandia.topic.name,
    content: sandia.content,
    question: sandia.question,
    answer: sandia.answer,
    reference: sandia.reference,
  };

  return destructuredSandia;
}

//borrar por id ♥ listo ♥
async function deleteById(id) {
  const deletedSandia = await Sandia.findByIdAndDelete(id);
  if (!deletedSandia) {
    throw createError(404, "delete error: no sandia found");
  }
  return deletedSandia;
}

//crear ♥ listo ♥
async function create({
  topic: topicName,
  content,
  question,
  answer,
  reference,
}) {
  let topic = await Topic.findOne({ name: topicName });

  if (!topic) {
    throw createError(404, `Topic "${topicName}" not found`);
  }

  const newSandia = new Sandia({
    topic: topic._id,
    content,
    question,
    answer,
    reference,
  });

  const isSandiaSaved = await newSandia.save();
  if (!isSandiaSaved) {
    throw createError(404, `create error`);
  }
  topic.data.push(newSandia._id);

  const isTopicSaved = await topic.save();
  if (!isTopicSaved) {
    throw createError(404, `Topic "${topicName}" not saved`);
  }

  return newSandia;
}

// update ♥ listo ♥
function update(id, updates) {
  const updatedSandia = Sandia.findByIdAndUpdate(id, updates, {
    returnOriginal: false,
  });

  if (!updatedSandia) {
    throw createError(404, `Update error: sandia not found`);
  }
  return updatedSandia;
}

module.exports = { getAll, create, getById, deleteById, update };
