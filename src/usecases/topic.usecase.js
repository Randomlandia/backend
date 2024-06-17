const Topic = require("../models/topics.model");
const createError = require("http-errors");

//traer todas
async function getAll() {
  const topics = await Topic.find();

  if (!topics) {
    throw createError(404, "no topics found");
  }
  return topics;
}

// crear topic ♥ listo ♥
async function create(name) {
  let newTopic = await Topic.findOne({ name });

  if (!newTopic) {
    newTopic = new Topic({ name, data: [] });
    await newTopic.save();
    return newTopic;
  } else {
    throw createError(409, `Topic error: could not create "${name}" `);
  }
}

//borrar por id ♥ listo ♥
async function deleteById(id) {
  const deletedTopic = await Topic.findByIdAndDelete(id);
  if (!deletedTopic) {
    throw createError(404, "delete error: no topic found");
  }
  return deletedTopic;
}
//actualizar

async function update(id, updates) {
  const updatedTopic = Topic.findByIdAndUpdate(id, updates, {
    returnOriginal: false,
  });

  if (!updatedTopic) {
    throw createError(404, `Update error: topic not updated`);
  }
  return updatedTopic;
}
//buscar por Id ♥ listo ♥
async function getById(id) {
  const topic = await Topic.findById(id);
  if (!topic) {
    throw createError(404, "no sandia found");
  }
  return topic;
}

module.exports = { getById, create, deleteById, update, getAll };
