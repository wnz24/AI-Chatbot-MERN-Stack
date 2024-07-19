import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import approuter from './routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

dotenv.config();

const app: Express = express();

app.use(cors({
  origin: "http://localhost:5173", // Ensure no trailing slash
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Remove in production
app.use(cookieParser(process.env.COOKIE_SECRET));

// Database connection
const uri: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
(async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();

// API call
app.use('/api/v1', approuter);

const PORT: string | number = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
