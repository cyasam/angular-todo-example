import { FormGroup, FormBuilder } from '@angular/forms';
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

  todoForm: FormGroup = this.fb.group({
    title: this.todos
  });
  openEditForm: boolean = false;

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    console.log(this.todoForm)
    this.todoForm.statusChanges.subscribe(value => {
      console.log(value);
    })
  }

  handleUpdateTodo(todo) {
    this.updateTodo.emit(todo);
  }

  handleEditTodo(todo){
    todo.title = this.todoForm.value.title;
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
