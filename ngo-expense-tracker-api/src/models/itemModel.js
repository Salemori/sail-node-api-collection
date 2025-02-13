const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Food", "Clothing", "Stationery", "Toys", "Medical Supplies", "Monetary"],
      required: true,
    },
    categoryDetail:{
      itemName: { type: String, required: true },
      itemMeasure: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      costPerUnit: { type: Number, required: true, min: 1},
    },
    totalCost: {
      type: Number,
      min: 1,
    },
    
    orphanageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orphanage",
      required: true,
    },
    purchasedBy:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  { timestamps: true }
);

// Remeber to add logic/background work for each delete. Also applicable to expense and donationSchedule.
// Move to middleware ???
itemSchema.pre("save", function (next) {
  this.totalCost = this.categoryDetail.reduce((sum, item) => sum + item.itemTotalCost, 0);
  next();
});

const ItemModel = mongoose.model("Item", itemSchema);
module.exports = ItemModel;
