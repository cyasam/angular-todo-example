import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnInit
} from "@angular/core";
import { TodoModel } from "../../../models/todo.interface";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: ".app-todo-list-item",
  templateUrl: "./todo-list-item.component.html",
  styleUrls: ["./todo-list-item.component.scss"],
  animations: [
    trigger("showItem", [
      state(
        "hide",
        style({
          opacity: 0
        })
      ),
      state(
        "show",
        style({
          opacity: 1
        })
      ),
      transition("hide => show", [animate("0.3s")])
    ])
  ]
})
export class TodoListItemComponent implements OnInit {
  showItem: boolean = false;
  @HostBinding("@showItem") get showItemFn() {
    return this.showItem ? 'show' : 'hide'
  }
  
  @Input()
  todo: TodoModel;
  @Output()
  editTodo: EventEmitter<TodoModel> = new EventEmitter();
  @Output()
  toggleEditTodo: EventEmitter<TodoModel> = new EventEmitter();
  @Output()
  deleteTodo: EventEmitter<TodoModel> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    setTimeout(() => (this.showItem = true));
  }

  handleToggleEditTodo(todo) {
    this.toggleEditTodo.emit(todo);
  }

  handleEditTodo(todo) {
    this.editTodo.emit(todo);
  }

  handleDeleteTodo(todo) {
    this.deleteTodo.emit(todo);
  }
}
