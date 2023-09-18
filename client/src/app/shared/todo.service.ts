import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodos(){
    return this.http.get('/api/todos');
  }

  addTodo(title: string) {
    return this.http.post('/api/todos',{
      title:title
    });
  }

  updateTodoStatus(title:string,id: string, newStatus: boolean) {
    return this.http.post('/api/todos',{
      todoId:id,
      completed:newStatus,
      title:title
    });
  }

  deleteTodo(id: string) {
    return this.http.delete(`/api/todos/${id}`)
  }
}
