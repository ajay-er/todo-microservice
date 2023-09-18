import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Todo from './model/todo-model';
import { kProducer } from './config/producer';
import { randomBytes } from 'crypto';

const app = express();

app.use(express.json());

//* API's
app.get('/todos', async (req: Request, res: Response) => {
  const result = await Todo.find({});
  res.send(result);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).send('Please provide all todo information.');
  }

  const todoId = randomBytes(4).toString('hex');

  const todo = await Todo.create({ title, description, todoId });

  kProducer(title, description, todo.todoId, 'Todo-Created');

  res.send(todo);
});

app.put('/todos', async (req: Request, res: Response) => {
  const { title, description, todoId, completed } = req.body;
  const todo = await Todo.findOne({ todoId: todoId });

  if (!todo) {
    return res.status(404).send('Todo not found!');
  }

  if (title) {
    todo.title = title;
  }

  if (description) {
    todo.description = description;
  }

  if (completed !== undefined) {
    todo.completed = completed;
  }

  await todo.save();

  kProducer(title, description, todoId, 'Todo-Updated');
  res.send(todo);
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
