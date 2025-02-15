const express = require("express");
const itemController = require("../controllers/itemController");

const itemRouter = express.Router();

itemRouter.post("/", itemController.createItem);


module.exports = itemRouter;