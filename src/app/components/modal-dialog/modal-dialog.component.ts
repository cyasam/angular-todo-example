import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TodoModel } from './../../models/todo.interface';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {

  @Input()
  isOpenModal: boolean;
  @Input()
  todo: TodoModel;

  @Output()
  closeModal: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  handleClose(){
    this.closeModal.emit();
  }

  handleDelete(todo){
    this.closeModal.emit(todo);
  }
}
