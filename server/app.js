import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';


const port = 3000;

connectDB(); // this is the line that is causing the crash

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is ready!')
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
