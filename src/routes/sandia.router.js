const express = require("express");
const router = express.Router();
const sandiaUseCase = require("../usecases/sandia.usecase");
const TopicUseCase = require("../usecases/topic.usecase");

const sandiaMiddleware = require("../middlewares/sandia.middleware");

// traer todas ♥ listo

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

//traer por id ♥ listo ♥

router.get("/:id", async (req, res) => {
  try {
    const sandia = await sandiaUseCase.getById(req.params.id);

    res.json({
      success: true,
      message: `sandia found by id`,
      data: {
        sandia: sandia,
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

// borrar ♥ listo ♥
router.delete("/:id", sandiaMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSandia = await sandiaUseCase.deleteById(id);

    res.json({
      success: true,
      message: `Sandia deleted`,
      data: {
        sandia: deletedSandia,
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

//crear sandia ♥ listo ♥
router.post("/", sandiaMiddleware, async (req, res) => {
  try {
    const newSandia = await sandiaUseCase.create(req.body);

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

// modificar por id ♥ listo ♥
router.put("/:id", sandiaMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedSandia = await sandiaUseCase.update(id, updates);

    res.json({
      success: true,
      message: `sandia successfuly updated`,
      data: {
        sandia: updatedSandia,
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

//getSandiasByTopic
router.get("/topic/:topic", async (req, res) => {
  try {
    const { topic } = req.params;
    const sandiasByTopic = await sandiaUseCase.getByTopic(topic);

    res.json({
      success: true,
      message: `Found sandias by topic ${topic}`,
      data: {
        sandias: sandiasByTopic,
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
