const mongoose = require("mongoose");
const config = require("../config/default.json");
require("dotenv").config({ path: process.env.MONGODB_URL });

try {
  mongoose.connect(
    "mongodb+srv://rajabalidowadjistore:VMYJt1rCrMsy80dE@rdstore.ttkyf.mongodb.net/rdstore?retryWrites=true&w=majority&appName=rdstore",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
} catch (error) {
  console.log(error);
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error {err}`));
dbConnection.once("open", () => console.log("Connection Done"));
