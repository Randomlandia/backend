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
