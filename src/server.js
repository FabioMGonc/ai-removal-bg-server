//import "./configs/dnstext.js";
import express from 'express';
import "dotenv/config";
import cors from 'cors';
import conectDB from './configs/mongodb.js';
import userRouter from './routes/userRoutes.js';

const PORT = process.env.PORT || 3000;

const app = express();
await conectDB();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api/user", userRouter);


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});