import "./configs/dnstext.js";
import express from 'express';
import "dotenv/config";
import cors from 'cors';
import conectDB from './configs/mongodb.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {
    try {
        await conectDB();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar:", error);
    }
};

startServer();