// ! import the model to make queries to the database
const Expense = require("../models/expense.model");

// all exports export the functions as keys to be called elsewhere

// ! Read All
module.exports.readAll = (request, response) => {
    // find all the expenses, store them in a variable we call allExpenses
    // and respond with a json object containing allExpenses in an array
    Expense.find()
        .then((allExpenses) => {
            response.json(allExpenses);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

// ! Read One
module.exports.readOne = (request, response) => {
    // find one of the expenses from the id that was pass in
    // and respond with that expenses
    Expense.findOne({ _id: request.params.id })
        .then((oneExpense) => {
            response.json(oneExpense);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

// ! Create
module.exports.create = (request, response) => {
    // create a new expense from the input/data that was passed in (we get this from request.body), and store it in a variable called newExpense
    // and respond with a json object of that newly created expense
    console.log(request.body);

    Expense.create(request.body)
        .then((newExpense) => {
            console.log("Server Success");
            response.json(newExpense);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

// ! Update
module.exports.update = (request, response) => {
    // update the expense from the input/data that was passed in (we get this from request.body), and store it in a variable called updatedExpense
    // and respond with the newly updated expense
    console.log("Updated ID: ", request.params.id);
    console.log("request.body: ", request.body);
    Expense.findOneAndUpdate(
        // get what you are updating it by (in this case id)
        { _id: request.params.id },

        // get all the data/input that the user wants to update
        request.body,

        // new true means return the updated object you created
        // run validators means run validations on update
        { new: true, runValidators: true }
    )
        .then((updatedExpense) => {
            response.json(updatedExpense);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

// ! Delete
module.exports.delete = (request, response) => {
    // delete the expense with the id that was passed in,
    // and respond with a json object that we created called deleteExpense as the key, and pass in the expense that matched the id

    // get what you are deleting it by (in this case id)
    Expense.deleteOne({ _id: request.params.id })
        .then((deleteExpense) => {
            response.json({ deleteExpense: deleteExpense })
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}