import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoModel } from '../../../models/todo.interface';

@Component({
  selector: 'app-todo-edit-form',
  templateUrl: './todo-edit-form.component.html',
  styleUrls: ['./todo-edit-form.component.scss']
})
export class TodoEditFormComponent implements OnInit {
  @Input()
  todo: TodoModel;
  @Input()
  openEditForm: boolean;

  @Output()
  editTodo: EventEmitter<any> = new EventEmitter();
  @Output()
  toggleEditTodo: EventEmitter<any> = new EventEmitter();

  @ViewChild('editInput')
  editInput: ElementRef;

  todoForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: [this.todo.title, Validators.required]
    });
    this.editInput.nativeElement.focus();
  }

  handleEditTodo() {
    if (this.todoForm.valid && this.todoForm.dirty) {
      this.todo.title = this.todoForm.value.title;
      this.editTodo.emit(this.todo);
    }
  }

  handleToggleEditTodo(todo) {
    this.toggleEditTodo.emit(todo);
  }
}
