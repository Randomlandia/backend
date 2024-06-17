const express = require("express");
const router = express.Router();
const topicUseCase = require("../usecases/topic.usecase");

// todas ♥ listo ♥
router.get("/", async (req, res) => {
  try {
    const topics = await topicUseCase.getAll();

    res.json({
      success: true,
      message: `topics found`,
      data: {
        sandia: topics,
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

//crear ♥ listo ♥

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newTopic = await topicUseCase.create(name);
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

// borrar ♥ listo ♥

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTopic = await topicUseCase.deleteById(id);
    res.json({
      success: true,
      message: `deleted topic successfuly: ${deletedTopic.name}`,
      data: {
        topic: deletedTopic,
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

// update ♥ listo ♥
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedTopic = await topicUseCase.update(id, updates);

    res.json({
      success: true,
      message: `topic successfuly updated`,
      data: {
        sandia: updatedTopic,
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

//buscar por id ♥ listo ♥
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await topicUseCase.getById(id);

    res.json({
      success: true,
      message: `topic found by id`,
      data: {
        topic: topic,
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
