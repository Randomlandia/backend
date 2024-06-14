const Topic = require("../models/topics.model");

async function create(name) {
  let newTopic = await Topic.findOne({ name });

  if (!newTopic) {
    newTopic = new Topic({ name, data: [] });
    await newTopic.save();
    return newTopic;
  } else {
    throw new Error(`Topic "${name}" already exists`);
  }
}

async function getById(id) {
  const topic = await Topic.findById(id);
  return topic;
}

async function deleteById(id) {
  const deletedTopic = await Topic.findByIdAndDelete(id);
  return deletedTopic;
}

function update(id, updates) {
  const updatedTopic = Topic.findByIdAndUpdate(id, updates, {
    returnOriginal: false,
  });
  return updatedTopic;
}

async function getAll() {
  const topics = await Topic.find();
  return topics;
}

module.exports = { getById, create, deleteById, update, getAll };
