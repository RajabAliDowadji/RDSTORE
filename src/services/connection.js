const mongoose = require("mongoose");
const config = require("../config/default.json");

const mongodbURL = process.env.MONGODB_URL;

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
