require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;
const app = express();

// config JSON and form data respose
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DBConnection
const conn = require("./config/db.js");
conn();

// routes
const router = require("./routes/Router");
app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
