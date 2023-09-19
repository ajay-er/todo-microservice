import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:4000';

  getAllTodos() {
    return this.http.get(`${this.baseUrl}/todos`);
  }

  addTodo(title: string) {
    return this.http.post(`${this.baseUrl}/todos`, {
      title: title,
    });
  }

  updateTodoStatus(title: string, id: string, newStatus: boolean) {
    return this.http.put(`${this.baseUrl}/todos`, {
      todoId: id,
      completed: newStatus,
      title: title,
    });
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.baseUrl}/todos/${id}`);
  }
}
