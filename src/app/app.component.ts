import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { TodoModel } from './models/todo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  error: Object;
  todos: TodoModel[] = [];
  loading = false;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  reloadList() {
    this.getTodos();
  }

  getTodos() {
    this.loading = true;
    this.todoService.getTodos().subscribe(
      (todos: TodoModel[]) => {
        this.loading = false;
        this.error = null;
        this.todos = todos;
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  addTodo(addedTodo) {
    this.loading = true;
    return this.todoService.addTodo(addedTodo).subscribe(
      (todo: TodoModel) => {
        this.loading = false;
        this.error = null;
        this.todos = [...this.todos, todo];
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  updateTodo(updatedTodo): void {
    this.loading = true;
    this.todoService.updateTodo(updatedTodo).subscribe(
      (result: TodoModel) => {
        this.loading = false;
        this.error = null;
        this.todos = this.todos.map(todo => {
          if (result.id === todo.id) {
            todo = updatedTodo;
          }

          return todo;
        });
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  deleteTodo(deletedTodo): void {
    this.loading = true;
    this.todoService.deleteTodo(deletedTodo).subscribe(
      () => {
        this.loading = false;
        this.error = null;
        this.todos = this.todos.filter(todo => todo.id !== deletedTodo.id);
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }
}
