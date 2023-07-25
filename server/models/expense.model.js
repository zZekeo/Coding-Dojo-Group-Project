// import mongoose to build a model
const mongoose = require("mongoose");

// create a new database
// ! the schema - the rules the entries in the database must follow
const ExpenseSchema = new mongoose.Schema({
    depositName: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, 'The expenses name must be 1 or more characters.']
    },

    withdrawName: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, 'The expenses name must be 1 or more characters.']
    },

    depositAmount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [1, 'The expenses name must be at least 1$.']
    },

    withdrawAmount: {
        type: Number,
        required: [true, "Amount is required"],
        // minLength: [3, 'The expenses name must be 3 or more characters.']
    },

    expenseDate: {
        type: Date,
        required: [true, "Date is required"]
    }
}, { timestamps: true })
// ! {timestamps: true} gives your model a "createdAt" and "updatedAt" key

// ! create the schema and export it
const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;