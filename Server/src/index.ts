import mongoose from 'mongoose'


import express from 'express';
mongoose.connect('mongodb://brandalik_adam_64d3f_hsqzv:oobQvcBNpvKjMG5vvZmGilXUkcaY8OZc@hosting.ssps.cajthaml.eu:3336/brandalik_adam_64d3f_hsqzv_db?authSource=brandalik_adam_64d3f_hsqzv_db')

const app = express();
const PORT = 3000;


app.use(express.json());

app.use((req: express.Request, res: express.Response, next :express.NextFunction)=>{
    
})
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello World!');
});
app.post('/login', (req: express.Request, res: express.Response) => {
   
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});