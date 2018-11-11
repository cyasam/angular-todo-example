import { Validators } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoModel } from '../../../models/todo.interface';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent {
  @Output()
  addTodo: EventEmitter<TodoModel> = new EventEmitter();

  newTodo: TodoModel = {
    id: null,
    title: '',
    completed: false
  };

  newTodoForm: FormGroup = this.fb.group({
    title: ['', Validators.required]
  });

  submitted = false;

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    this.submitted = true;

    if (this.newTodoForm.valid) {
      this.newTodo.title = this.newTodoForm.value.title;
      this.addTodo.emit(this.newTodo);
      this.resetForm();
    }
  }

  resetForm() {
    this.newTodoForm.reset({ title: '' });
    this.submitted = false;
  }
}
