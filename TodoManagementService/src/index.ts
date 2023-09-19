import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Todo from './model/todo-model';
import { kProducer } from './config/producer';
import { randomBytes } from 'crypto';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//* API's
app.get('/todos', async (req: Request, res: Response) => {
  const result = await Todo.find({});
  res.json(result);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send('Please provide all todo information.');
  }

  const todoId = randomBytes(4).toString('hex');

  const todo = await Todo.create({ title, todoId });

  kProducer(title, todo.todoId,todo.completed, 'Todo-Created');

  res.json(todo);
});

app.put('/todos', async (req: Request, res: Response) => {
  const { todoId, completed, title } = req.body;
  await Todo.updateOne({ todoId }, { $set: { completed: completed } });
  kProducer(title, todoId, completed ,'Todo-Updated');
  res.json({ message: 'Todo Updated Successfully' });
});

app.delete('/todos/:id', async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const todo = await Todo.deleteOne({ todoId: todoId });

  if (!todo) {
    return res.status(404).send('Todo not found!');
  }

  res.json({});
});

//* start server
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected To MongoDB');
  } catch (error) {
    console.log(error);
  }
  app.listen(4000, () => {
    console.log('Listening on port 4000!');
  });
};

start();
