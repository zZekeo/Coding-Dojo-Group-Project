const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const DB = "expenses";

// middleware
app.use(express.json());
express.urlencoded({ extended: true });

// ! cors allows us to communicate the routes between the backend server and our front-end server
app.use(cors());

// imports the config function and runs it because we call it passing in the database variable
// ! connect to the DB using mongoose
require("./config/mongoose.config")(DB);

// ! imports the routes function and runs it because we call it passing in the app variable
require("./routes/expenses.routes.js")(app);

// ! start the server
app.listen(port, () => console.log(`Server is up and running on port ${port}`));