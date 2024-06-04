const express = require("express");
const itemRouter = require("./items");
const app = express();

app.use("/items", itemRouter);


module.exports = app;