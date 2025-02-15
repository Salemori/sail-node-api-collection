const ExpenseModel = require("../models/expenseModel");
const ItemModel = require("../models/itemModel");


exports.getExpenses = async (request, response) => {
  try {
    const expenses = await ExpenseModel.find({});

    if (!expenses) {
      console.log(!expenses);
      return response.json({
        status: "failed",
        message: "Failed to retrieved expense(s)",
      });
    }

    response.status(200).json({
      status: "success",
      message: "expense(s) retrieved successfully",
      expenses,
    });
  } catch (error) {
    response.json({
      status: "failed",
      message: error.message,
    });
  }
};

exports.getExpense = () => {};

exports.createExpense = async (request, response) => {
try {
    const {
        category,
        description,
        dateSpent,
        recieptUrl,
        orphanage,
        items,
        createdBy,
    } = request.body;

    if ((!(category == "Food"  || category == "Clothing" || category == "Medical Supplies" || category == "Stationery")) && totalExpense == null){
        response.send("Total expense cannot be null for this category")
    } 

    const expense = new ExpenseModel({
        category,
        description,
        dateSpent,
        totalExpense: 0,
        recieptUrl,
        orphanageFK: orphanage,
        createdByFK: createdBy
    });
    await expense.save();

    let totalExpense = 0;
    let createdItems = [];

    if ((category == "Food"  || category == "Clothing" || category == "Medical Supplies" || category == "Stationery") && items && items.length > 0){
        const itemDataCollection = items.map((item) => {
            const itemTotalCost = item.quantity * item.costPerMeasure;
            totalExpense += itemTotalCost;

            return {
                itemName: item.itemName,
                itemMeasure: item.itemMeasure,
                unit: item.unit,
                quantity: item.quantity,
                costPerMeasure: item.costPerMeasure,
                itemTotalCost,
                expenseFK: expense._id,
                orphanageFK: orphanage,
                purchasedByFK: createdBy,
              };
        });
    createdItems = await ItemModel.insertMany(itemDataCollection);

    }


    expense.itemsFK = createdItems.map((item) => item._id);
    expense.totalExpense = totalExpense;

    await expense.save()



    return response.status(200).json({
        status: "success",
        message: "Expense created successfully",
        expense
    });
    

} catch (error) {
    return response.json({
        status: "failed",
        message: "Failed to create expense",
        error: error.message
    });
}


};
