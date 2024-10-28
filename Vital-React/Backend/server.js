import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log("server is running!!!");
});

// const express = require("express");
// const mysql = require("mysql");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "vf",
// });
// app.get("/", (re, res) => {
//   return res.json("From Backend side");
// });

// app.get("/users", (req, res) => {
//   const sql = "SELECT * from users";
//   db.query(sql, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });
// app.listen(8081, () => {
//   console.log("listening");
// });
