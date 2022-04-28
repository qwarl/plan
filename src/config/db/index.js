// Using Node.js `require()`
const mongoose = require('mongoose');
//connect to mongodb
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin1:admin1@plan-1.bldle.mongodb.net/plan-1?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongoose Connection is successfully!!!');
    } catch (error) {
        console.log('Mongoose Connection is failure!!!');

    }
}

module.exports = { connect };