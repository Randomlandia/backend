const express = require("express");
const router = express.Router();
const Sandia = require("../models/sandia.model");
const Topic = require("../models/topics.model");
const sandiaUseCase = require("../usecases/sandia.usecase");
const TopicUseCase = require("../usecases/topic.usecase");

router.get("/", async (req, res) => {
  try {
    const allSandias = await sandiaUseCase.getAll();
    res.json({
      success: true,
      message: "All sandias",
      data: {
        sandias: allSandias,
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

router.post("/", async (req, res) => {
  try {
    const newSandia = await sandiaUseCase.create(req.body);
    console.log({ newSandia });

    const topicId = newSandia.topic.toString();
    const topic = await TopicUseCase.getById(topicId);

    res.json({
      success: true,
      message: `New sandia created under topic: ${topic.name}`,
      data: {
        sandia: newSandia,
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
