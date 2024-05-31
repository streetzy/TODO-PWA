import express from "express";
import Joi from "joi";
import { Md5 } from "ts-md5";
import jwt from "jsonwebtoken";
import { error, time } from "console";
import dotenv from "dotenv";
import { generateToke } from "../Login.js";
import { access } from "fs";
import { user } from "../../models/modules.js";
dotenv.config();

export async function AuthMidleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader ? authHeader.split(" ")[0] : null;

    if (token != null) {
      jwt.verify(token, String(process.env.ACCESS_TOKEN), (err, id) => {
        if (err) {
          res.status(401).send("Invalid token");
          console.log("Invalid acc token");
          return;
        }

        if (id) {
          req.body.id = id;
          let gg = req.body.id.id;
          req.body.id = gg;
          console.log("authmidleware succesfull");
          next();
        }
      });
    } else {
      res.status(401).send("Unauthorized");
      console.log("AuthMidleware 401: no token found");
    }
  } catch {
    res.status(500).send("Internal server error");
    console.log("500: AuthMidleware try catch error");
  }
}
