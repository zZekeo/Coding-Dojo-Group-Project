const ExpenseController = require("../controllers/expense.controller");

// ! our routes get passed to the controller which runs the CRUD functions
module.exports = (app) => {
    app.get("/api/allExpenses", ExpenseController.readAll);
    app.get("/api/allDeposits", ExpenseController.readAll);

    app.post("/api/newDeposit", ExpenseController.create);
    app.post("/api/newWithdraw", ExpenseController.create);
    app.get("/api/oneDeposit/:id", ExpenseController.readOne);
    app.get("/api/oneWithdraw/:id", ExpenseController.readOne);
    app.put("/api/updateExpense/:id", ExpenseController.update);
    app.delete("/api/deleteExpense/:id", ExpenseController.delete);
}