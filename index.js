const express = require("express");
// const users = require("./MOCK_DATA.json");
// const fs = require("fs");
const mongoose = require("mongoose");
// const { type } = require("os");
// const { timeStamp } = require("console");
const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/index");

const app = express();
const PORT = 3000;

//connection
connectMongoDb("mongodb://127.0.0.1:27017/RestDb");

//Model
// const User = mongoose.model("User", userSchema);

//Middleware - plugins
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`server is running at port: ${PORT}`);
});
