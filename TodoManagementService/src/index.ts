import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Todo from './todo-model';

const app = express();

app.use(express.json());

app.get('/todos', async (req: Request, res: Response) => {
  const result = await Todo.find({});
  res.send(result);
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title, description, todoId } = req.body;

  if (!title || !description || !todoId) {
    return res.status(400).send('Please provide all todo information.');
  }

  const todo = await Todo.create({ title, description, todoId });

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
  res.send(todo);
});

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
