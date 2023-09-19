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
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe((items) => {
      console.log(items);
      this.todos = items;
    });
  }

  onClick(input: HTMLInputElement) {
    if (input.value) {
      this.todoService.addTodo(input.value).subscribe((res) => {
        console.log(res);
        this.getAllTodos();
      });

      input.value = '';
    }
  }

  onStatusChange(title: string, todoId: string, newStatus: boolean) {
    this.todoService
      .updateTodoStatus(title, todoId, newStatus)
      .subscribe((update) => {
        console.log(update);
        this.getAllTodos();
      });
  }

  onDelete(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe((res) => {
      console.log(res);
      this.getAllTodos();
    });
  }
}
