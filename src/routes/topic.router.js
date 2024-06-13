const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newTopic = await sandiaUseCase.create();
    res.json({
      success: true,
      message: `New topic created: ${newTopic.name}`,
      data: {
        topic: newTopic,
      },
    });
  } catch (error) {
    res.status(error.status || 500);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

/* 
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

*/
