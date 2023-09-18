import { Schema, Document, model } from 'mongoose';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  todoId:string;
}

const todoSchema = new Schema<Todo & Document>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  todoId:{
    type: String,
    required:true
  }
});

const TodoModel = model<Todo & Document>('Todo', todoSchema);

export default TodoModel;
