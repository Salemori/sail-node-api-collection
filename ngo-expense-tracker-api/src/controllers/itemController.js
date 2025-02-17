const ItemModel = require("../models/itemModel");


const createItem = async (request, response) => {
    try {
        const {category, name, measure, quantity, costPerMeasure, unit, expense, orphanage, purchasedBy} = request.body
        // const item = new ItemModel(request.body);
        // OR
        const itemTotalCost = quantity * costPerMeasure
        const item = new ItemModel({
            category,
            itemName: name,
            itemMeasure: measure,
            quantity,
            costPerMeasure,
            unit,
            itemTotalCost: itemTotalCost,
            expenseFK: expense,
            orphanageFK: orphanage,
            purchasedBy
        })
        await item.save();

        response.status(200).json({
            status: "success",
            message: "Item created successfully",
            item
        });
    } catch (error) {
        response.json({
            status: "failed",
            message: error.message
        });
      
    }    

}

module.exports = {createItem}