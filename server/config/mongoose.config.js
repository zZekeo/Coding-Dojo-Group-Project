// import mongoose
const mongoose = require("mongoose");

// ! connect to the database using mongoose, passing in the variable DB as the name of the database
module.exports = (DB) => {
    mongoose.connect(`mongodb://localhost/${DB}`)
        .then(() => {
            console.log(`Connected to the ${DB} database.`);
        })
        .catch(() => {
            console.log(`Cannont connect to the ${DB} database.`);
        })
}