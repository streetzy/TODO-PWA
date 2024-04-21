import mongoose from "mongoose";
import { user } from "../models/modules.js";

import express from "express";
import Joi from "joi";
import { Md5 } from "ts-md5";

import dotenv from "dotenv";
dotenv.config();
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12),
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(40),
});
export async function register(req: express.Request, res: express.Response) {
  try {
    const NewUser = new user();
    const { error, value } = registerSchema.validate(req.body);

    if (error != undefined) {
      console.log(error);
      console.log("/register 400: Invalid data");
      return res.status(400).send("gg");
    } else {
      console.log("alkane");
      const User = await user.findOne({ email: value.email });

      if (User) {
        console.log("/register 400: Email already used");
        return res.status(400).send("gg");
      }
      NewUser.userName = value.username;
      NewUser.email = value.email;
      NewUser.password = Md5.hashStr(value.password);
      await NewUser.save();
      console.log("/register 201: New user added");
      res.status(201).send("gg");
    }
  } catch {
    console.log("/register 500: Try catch exeption");
    res.status(500).send("gg");
  }
}
