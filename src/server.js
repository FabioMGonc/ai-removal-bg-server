import express from 'express';
import "dotenv/config";
import cors from 'cors';

const PORT = process.env.PORT;

const app = express();

app.listen(PORT)