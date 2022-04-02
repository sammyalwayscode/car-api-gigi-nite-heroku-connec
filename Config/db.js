const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://W8PypVqIRJXDReMh:W8PypVqIRJXDReMh@cluster0.1nq2x.mongodb.net/gidinite?retryWrites=true&w=majority";

const NEWURI = "mongodb://localhost/";

mongoose.connect(MONGODB_URI);

mongoose.connection
  .on("open", (stream) => {
    console.log("Connected to database sucessfully");
  })
  .once("error", (stream) => {
    console.log("Failed to connect to database");
  });
