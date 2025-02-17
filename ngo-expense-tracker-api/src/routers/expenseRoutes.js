const express = require("express");
const expenseController = require("../controllers/expenseController");


const expenseRouter = express.Router();


expenseRouter.get("/", expenseController.getExpenses);
expenseRouter.get("/expense-by-orphanage/:id", expenseController.getTotalOrphanageExpense);
expenseRouter.post("/", expenseController.createExpense);




module.exports = expenseRouter;