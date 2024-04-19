"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Auth_1 = require("./AuthRouter/Auth");
const express_1 = __importDefault(require("express"));
const modules_1 = require("./modules");
mongoose_1.default.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db');
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(Auth_1.Authrouter);
modules_1.user.create({ email: "asdfsdf", password: "asdasd" }).then(() => { console.log("gg"); });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
