import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { consumer } from './config/consumer';

const app = express();

app.use(express.json());

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected To MongoDB');
  } catch (error) {
    console.log(error);
  }
  app.listen(4001, () => {
    console.log('Listening on port 4001!');
    consumer();
  });
};

start();
