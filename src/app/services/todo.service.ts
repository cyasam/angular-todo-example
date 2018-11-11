import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TodoModel } from '../models/todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClient: HttpClient) {}

  getTodos(): Observable<TodoModel[]> {
    return this.httpClient.get('http://localhost:3000/todos').pipe(
      tap((res: TodoModel[]) => {
        return res;
      }),
      catchError(value => throwError(value))
    );
  }

  addTodo(todo): Observable<TodoModel> {
    return this.httpClient.post(`http://localhost:3000/todos`, todo).pipe(
      tap((res: TodoModel) => {
        return res;
      }),
      catchError(value => throwError(value))
    );
  }

  updateTodo(todo): Observable<TodoModel> {
    return this.httpClient
      .put(`http://localhost:3000/todos/${todo.id}`, todo)
      .pipe(
        tap((res: TodoModel) => {
          return res;
        }),
        catchError(value => throwError(value))
      );
  }

  deleteTodo(todo): Observable<TodoModel> {
    return this.httpClient
      .delete(`http://localhost:3000/todos/${todo.id}`)
      .pipe(
        tap((res: TodoModel) => {
          return res;
        }),
        catchError(value => throwError(value))
      );
  }
}
