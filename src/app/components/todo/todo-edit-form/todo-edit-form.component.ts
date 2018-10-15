import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TodoModel } from "../../../models/todo.interface";

@Component({
  selector: "app-todo-edit-form",
  templateUrl: "./todo-edit-form.component.html",
  styleUrls: ["./todo-edit-form.component.scss"]
})
export class TodoEditFormComponent implements OnInit {
  @Input()
  todo: TodoModel;

  @Output()
  editTodo: EventEmitter<any> = new EventEmitter();

  todoForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: this.todo.title
    });
  }

  handleEditTodo(){
    this.todo.title = this.todoForm.value.title;
    this.editTodo.emit(this.todo);
  }
}
