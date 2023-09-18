import { Component } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [],
})
export class TodoComponent {
  todos: any = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getAllTodos().subscribe((items) => {
      this.todos = items;
    });
  }

  onClick(input: HTMLInputElement) {
    if (input.value) {
      this.todoService.addTodo(input.value);

      input.value = '';
    }
  }

  onStatusChange(title: string, todoId: string, newStatus: boolean) {
    this.todoService.updateTodoStatus(title, todoId, newStatus);
  }

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }
}
