const Sandia = require("../models/sandia.model");
const Topic = require("../models/topics.model");

async function getAll() {
  const sandias = await Sandia.find().populate("topic");
  return sandias;
}

async function create({ topicName, content, question, answer, reference }) {
  let topic = await Topic.findOne({ topicName });

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

module.exports = { getAll, create };
