var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { user } from '../models/modules.js';
import express from 'express';
import Joi from 'joi';
import { Md5 } from 'ts-md5';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const Authrouter = express.Router();
Authrouter.use(express.json);
export function AuthMidleware(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token != null) {
            jwt.verify(token, String(process.env.ACCESS_TOKEN), (err, _id) => {
                if (err) {
                    console.log("AuthMidleware 401: incvalid token");
                    return res.status(401);
                }
                req.body._id = _id;
                console.log("authmidleware succesfull" + _id);
                next();
            });
        }
        else {
            res.status(401);
            console.log("AuthMidleware 401: no token found");
        }
    }
    catch (_a) {
        res.status(500);
        console.log("500: AuthMidleware try catch error");
    }
}
Authrouter.post('/register', (req, res) => {
    try {
        const NewUser = new user;
        if (Joi.string().email == req.body.email && req.body.password.length > 8) {
            () => __awaiter(void 0, void 0, void 0, function* () {
                const User = yield user.findOne({ email: req.body.email });
                if (User) {
                    console.log("/register 400: Email already used");
                    res.status(400);
                    return;
                }
                NewUser.email = req.body.email;
                NewUser.password = Md5.hashStr(req.body.password);
                yield NewUser.save();
                console.log("/register 201: New user added");
                res.status(201);
            });
        }
        else {
            console.log("/register 400: Invalid data");
            res.status(400);
        }
    }
    catch (_a) {
        console.log("/register 500: Try catch exeption");
        res.status(500);
    }
});
Authrouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        let User = yield user.findOne({ email: req.body.email }).exec();
        if ((User === null || User === void 0 ? void 0 : User.password) == Md5.hashStr(req.body.password)) {
            const accToken = jwt.sign(User._id, String(process.env.ACCESS_TOKEN), { expiresIn: '1d' });
            res.json({ accessToken: accToken });
        }
    }
    catch (_a) {
        console.log("/register 500: Try catch exeption");
        res.status(500);
    }
}));
