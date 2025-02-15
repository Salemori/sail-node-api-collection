const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    // category: {
    //   type: String,
    //   enum: [
    //     "Food",
    //     "Clothing",
    //     "Stationery",
    //     "Toys",
    //     "Medical Supplies",
    //     "Monetary",
    //   ],
    //   required: true,
    // },
    itemName: { type: String, required: true },
    itemMeasure: { type: String, required: true },
    unit: { type: String},
    quantity: { type: Number, required: true, min: 1 },
    costPerMeasure: { type: Number, required: true, min: 1 },

    itemTotalCost: {
      type: Number,
      min: 1,
      required: true
    },

    expenseFK: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
      required: true,
    },

    orphanageFK: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orphanage",
      required: true,
    },
    purchasedByFK: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ItemModel = mongoose.model("Item", itemSchema);
module.exports = ItemModel;
