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

  openEditForm: boolean = false;

  constructor(){}

  handleUpdateTodo(todo) {
    this.updateTodo.emit(todo);
  }

  checkTodo(todo){
    todo.completed = !todo.completed;
    this.handleUpdateTodo(todo);
  }

  editTodo(todo){
    this.handleUpdateTodo(todo);
    this.toggleEditTodo();
  }

  toggleEditTodo(){
    this.openEditForm = !this.openEditForm;
  }
  
  handleDeleteTodo(todo) {
    this.deleteTodo.emit(todo);
  }
}
