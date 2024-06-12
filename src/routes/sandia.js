const express = require('express')
const router = express.Router()
const Sandia = require('../models/model_sandia')
const Topic = require('../models/model_topics')

router.get('/', async (req, res) => {
  try {
    const sandias = await Sandia.find().populate('topic')
    res.status(200).send({
      message: 'All the data',
      data: sandias
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      message: 'Error: Please review with your SystemAdministrator',
      data: null
    })
  }
})
router.post('/newtopic', async (req, res) => {
  try {
    const { name } = req.body;
    let topic = await Topic.findOne({ name: name });

    if (!topic) {
      topic = new Topic({ name: name, data: [] });
      await topic.save();
      res.status(201).send({ message: `New topic created: ${name}` });
    } else {
      res.status(400).send({ message: `Topic "${name}" already exists` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.post('/newsandia', async (req, res) => {
  try {
    const { topicName, content, question, answer, reference } = req.body;
    let topic = await Topic.findOne({ name: topicName });

    if (!topic) {
      return res.status(404).send({ message: `Topic "${topicName}" not found` });
    }

    const newSandia = new Sandia({
      topic: topic._id,
      content,
      question,
      answer,
      reference
    });

    await newSandia.save();

    topic.data.push(newSandia._id);
    await topic.save();

    res.status(201).send({
      message: `New sandia created under topic: ${topicName}`
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

module.exports = router
