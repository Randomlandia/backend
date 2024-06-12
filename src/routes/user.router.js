const express = require("express");
const userUseCase = require("../usecases/user.usecase");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allUsers = await userUseCase.getAll();
    res.json({
      success: true,
      message: "All users",
      data: {
        users: allUsers,
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

router.get("/:id", async (req, res) => {
  try {
    const user = await userUseCase.getById(req.params.id);
    res.json({
      success: true,
      message: "user id found",
      data: {
        users: user,
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

router.get("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userUseCase.getByEmail(email);
    res.json({
      success: true,
      message: "User email found",
      data: {
        users: user,
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
    const newUser = await userUseCase.create(req.body);
    res.status(201).json({
      success: true,
      message: "User created",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await userUseCase.getById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const updates = req.body;
    const user = await userUseCase.update(userID, updates);
    res.status(200).json({
      success: true,
      message: "User deleted",
      data: {
        user: user,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

module.exports = router;
