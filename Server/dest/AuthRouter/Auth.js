"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMidleware = exports.Authrouter = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const modules_1 = require("../modules");
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const ts_md5_1 = require("ts-md5");
mongoose_1.default.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db');
exports.Authrouter = express_1.default.Router();
exports.Authrouter.use(express_1.default.json);
function AuthMidleware(req, res, next) {
    next();
}
exports.AuthMidleware = AuthMidleware;
exports.Authrouter.post('/register', (req, res) => {
    const NewUser = new modules_1.user;
    if (joi_1.default.string().email == req.body.email && req.body.password.length > 8) {
        () => __awaiter(void 0, void 0, void 0, function* () {
            NewUser.email = req.body.email;
            NewUser.password = ts_md5_1.Md5.hashStr(req.body.password);
            yield NewUser.save();
        });
    }
});
exports.Authrouter.post('/login', (req, res) => {
});
