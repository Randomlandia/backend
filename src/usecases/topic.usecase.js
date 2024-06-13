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

module.exports = { getById, create };
