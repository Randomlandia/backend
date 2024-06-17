const Sandia = require("../models/sandia.model");
const Topic = require("../models/topics.model");
const ObjectId = require("mongodb").ObjectId;

// traer todas ♥ listo
async function getAll() {
  const sandias = await Sandia.find().populate("topic");
  return sandias;
}

// traer por id ♥ listo
async function getById(id) {
  const sandia = await Sandia.findById(id).populate("topic");
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

//borrar por id ♥
async function deleteById(id) {
  const deletedSandia = await Sandia.findByIdAndDelete(id);
  return deletedSandia;
}

//crear  listo ♥
async function create({
  topic: topicName,
  content,
  question,
  answer,
  reference,
}) {
  let topic = await Topic.findOne({ name: topicName });

  if (!topic) {
    throw new Error(`Topic "${topicName}" not found`);
  }

  const newSandia = new Sandia({
    topic: topic._id,
    content,
    question,
    answer,
    reference,
  });

  await newSandia.save();

  topic.data.push(newSandia._id);
  await topic.save();

  return newSandia;
}

// update listo ♥
function update(id, updates) {
  const updatedSandia = Sandia.findByIdAndUpdate(id, updates, {
    returnOriginal: false,
  });
  return updatedSandia;
}

module.exports = { getAll, create, getById, deleteById, update };
