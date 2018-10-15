import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { TodoModel } from '../../../models/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  @Input() todos: TodoModel[];
  @Input() loading: boolean;
  @Input() error: Object;

  @Output() updateTodo: EventEmitter<TodoModel> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<TodoModel> = new EventEmitter();

  openEditForm: boolean[] = [];
  isOpenModal: boolean = false;
  deletingTodo: TodoModel;

  constructor(){}

  ngOnInit() {
    this.todos.map(todo => todo.openEditForm = false);
  }

  handleUpdateTodo(todo) {
    this.updateTodo.emit(todo);
  }

  checkTodo(todo){
    todo.completed = !todo.completed;
    this.handleUpdateTodo(todo);
  }

  editTodo(todo){
    this.removeOpenEditFormPorperty(todo)
    this.handleUpdateTodo(todo);
  }

  toggleEditTodo(todo){
    todo.openEditForm = !todo.openEditForm;
  }

  removeOpenEditFormPorperty(todo){
    delete todo.openEditForm
  }

  openModal(todo){
    this.deletingTodo = todo;
    this.isOpenModal = true;
  }

  closeModal(todo){
    this.isOpenModal = false;

    if (todo) {
      this.handleDeleteTodo(todo);
    }
  }
  
  handleDeleteTodo(todo) {
    this.deleteTodo.emit(todo);
  }
}
