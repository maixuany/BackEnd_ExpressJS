const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT || 8080;
const URI_DB = process.env.URL_MONGODB;

const router = require("./routes/index");
const authRouter = require("./middleware/routes");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

mongoose.set("strictQuery", true);

mongoose
  .connect(URI_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.log("Error Connecting to Database " + error);
  });

app.use("/auth", authRouter);
app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
