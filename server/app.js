import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 
import userRoutes from './routes/userRoutes.js'

dotenv.config();
const port = process.env.port;
connectDB();
const app = express();

app.use('/api/users', userRoutes);
app.use(notFound);
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Server is ready!')
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});
