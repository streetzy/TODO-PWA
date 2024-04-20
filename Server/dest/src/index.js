var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Authrouter } from './AuthRouter/Auth.js';
import express from 'express';
dotenv.config();
mongoose.connect(String(process.env.MONGO_URL)).then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("DB connected");
}));
const app = express();
const PORT = 3000;
app.use(express.json());
app.use('/', Authrouter);
app.get('/', (req, res) => {
    console.log("gg");
    res.status(200);
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
