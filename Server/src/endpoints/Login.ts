import mongoose from "mongoose";
import { user } from "../models/modules.js";
import { todo } from "../models/modules.js";
import express from "express";
import Joi from "joi";
import { Md5 } from "ts-md5";
import jwt from "jsonwebtoken";
import { error, time } from "console";
import dotenv from "dotenv";
dotenv.config();

export async function login(req: express.Request, res: express.Response) {
  try {
    console.log(req.body);
    let User = await user.findOne({ email: req.body.email }).exec();
    if (User?.password == Md5.hashStr(req.body.password)) {
      const refToken: string = jwt.sign(
        { id: User._id },
        String(process.env.REFRESH_TOKEN)
      );
      const accToken = generateToke(String(User._id));
      User.refreshToken = Md5.hashStr(refToken);
      User.save();
      res.status(200).json({ refreshToken: refToken, accessToken: accToken });
      console.log("/login 200: Jwt token send succesfully");
    } else {
      res.status(400).send("bad credentials");
      console.log("email or password not correct");
    }
  } catch (error) {
    console.log("/login 500: Try catch exeption");
    res.status(500).send("gg");
  }
}

export function generateToke(id: string): string {
  const accToken = jwt.sign({ id: id }, String(process.env.ACCESS_TOKEN), {
    expiresIn: "30m",
  });
  return accToken;
}
