// definicion del servidor
//aquí importamos express y ponemos qué rutas existen.
const express = require("express");
const userRouter = require("./routes/user.router");
const sandiaRouter = require("./routes/sandia.router");
const topicRouter = require("./routes/topic.router");

const server = express();

//middlewares
server.use(express.json());

server.use("/users", userRouter);
server.use("/sandias", sandiaRouter);
server.use("/topic", topicRouter);

server.get("/", (req, res) => {
  res.json({
    message: "Randomlandia API - Abandon all hope ye who enter here",
    success: true,
  });
});

module.exports = server;