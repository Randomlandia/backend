const Topic = require("../models/topics.model");

async function create(name) {
  let topic = await Topic.findOne({ name });

  if (!topic) {
    topic = new Topic({ name, data: [] });
    await topic.save();
    return topic;
  } else {
    throw new Error(`Topic "${name}" already exists`);
  }
}

async function getById(id) {
  const topic = await Topic.findById(id);
  return topic;
}

module.exports = { getById, create };
