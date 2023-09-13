import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = 3000;
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
