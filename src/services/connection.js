const mongoose = require("mongoose");
const config = require("../config/default.json");
require("dotenv").config({ path: process.env.MONGODB_URL });

const mongodbURL = process.env.MONGODB_URL;
console.log("Abdeali mongodbURL", mongodbURL);

try {
  mongoose.connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (error) {
  console.log(error);
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error {err}`));
dbConnection.once("open", () => console.log("Connection Done"));
