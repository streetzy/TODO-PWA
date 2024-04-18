import mongoose from 'mongoose'

import { Authrouter } from './AuthRouter/Auth';
import express from 'express';
import { AuthMidleware } from './AuthRouter/Auth';
import { nextTick } from 'process';

mongoose.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db')

const app = express();
const PORT = 3000;

const gg = AuthMidleware
app.use(express.json());

app.use(Authrouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});