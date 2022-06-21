const mongoose = require("mongoose");

async function connection() {
  await mongoose.connect("mongodb://localahost:27017/test", {
    useNewUrlParser: true,
  });
}

module.exports = connection;
