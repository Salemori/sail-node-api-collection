const express = require("express");
const expenseController = require("../controllers/expenseController");


const expenseRouter = express.Router();


expenseRouter.get("/", expenseController.getExpenses);
expenseRouter.post("/", expenseController.createExpense);



module.exports = expenseRouter;