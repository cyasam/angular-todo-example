import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoModel } from '../../../models/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  @Input() todos: TodoModel[];
  @Input() loading: boolean;
  @Input() error: Object;

  @Output() updateTodo: EventEmitter<TodoModel> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<TodoModel> = new EventEmitter();

  handleUpdateTodo(todo) {
    this.updateTodo.emit(todo);
  }
  
  handleDeleteTodo(todo) {
    this.deleteTodo.emit(todo);
  }
}
