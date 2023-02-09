const express = require("express");
const app = express();
const cors = require("cors");

const { connection } = require("./config/db");
const { SignRouter } = require("./Router/user.routes");
const { messageRoute } = require("./Router/message.routes");


app.use(cors());
app.use(express.json());
require("dotenv").config();
app.use("/", SignRouter);
app.use("/",messageRoute)
app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(`connected to PORT No ${process.env.port || 3100}`);
  } catch (err) {
    console.log(err);
  }
});
