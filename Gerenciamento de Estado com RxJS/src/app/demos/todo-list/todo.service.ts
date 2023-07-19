import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './task';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient) { }
  
  
  // Criando uma propriedade que irá retorar uma lista de Tasks pegando do endereço informado
  // É a forma que consumimos informações do backend.
  getTodoList$ : Observable<Task[]> = this.http
    .get<Task[]>('http://localhost:3000/todolist');


  // Essa é a forma feita sem o $ no final.. deixando menos clean.

  // getToDoList() : Observable<Task[]> {
  //   return this.http
  //   .get<Task[]>('http://localhost:3000/todolist')
  // }



  
}