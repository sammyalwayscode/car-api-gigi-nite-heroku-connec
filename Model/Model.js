const mongoose = require("mongoose");
const carScheme = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  type: {
    type: String,
    require: true,
  },

  avatar: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },
});

const carModel = mongoose.model("CarsData", carScheme);
module.exports = carModel;
