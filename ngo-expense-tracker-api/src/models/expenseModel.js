const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
    category:[{
        type: String,
        enum: ["Food", "Clothing", "Stationery", "School Fee", "Medical Supplies", "Medical Bill", "Infrastructure", "Rent", "Utility", "Monetary", "Transportation"],
        required: true
    }],
    description:{
        type: String,
        required: true,
    },
    dateSpent:{
        type: Date,
        required: true,
        default : Date.now
    },
    totalExpense: {
        type: Number,
        required: true
    },
    recieptUrl:{
        type: String
    },
    orphanageFK:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orphanage",
        required: true
    },
    itemsFK: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item"
    }],
    createdByFK:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    //  updatedByFK:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // } 
},
{timestamps: true}

);

const ExpenseModel = mongoose.model("Expense", expenseSchema);
module.exports = ExpenseModel;