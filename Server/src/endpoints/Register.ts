import mongoose from "mongoose";
import { user, group } from "../models/modules.js";

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
    const NewUserGroup = new group();
    const { error, value } = registerSchema.validate(req.body);

    if (error != undefined) {
      console.log(error);
      return res.status(400).send("Invalid data error");
    } else {
      const User = await user.findOne({ email: value.email });

      if (User) {
        return res.status(400).send("Email already used");
      }
      NewUser.userName = value.username;
      NewUser.email = value.email;
      NewUser.password = Md5.hashStr(value.password);
      NewUser.groups.push(NewUserGroup.id);

      NewUserGroup.groupName = value.username;
      NewUserGroup.owner = NewUser.id;

      await NewUser.save();
      await NewUserGroup.save();
      res.status(201).send("New user added");
    } //
  } catch {
    res.status(500).send("Internal server error");
  }
}
