import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: [`http://localhost:${PORT}`, "http://localhost:5173"],
  })
);

app.use(bodyParser.text());

app.get("/userTodo");
