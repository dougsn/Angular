import { map } from 'rxjs/operators';
import { Store } from './../../todo.store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';

import { TasksService } from '../../todo.service';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html'
})
export class TasksComponent implements OnInit, OnDestroy {

  todolist$: Observable<any[]>
  subscription: Subscription;
  
  constructor(private tasksService: TasksService, private store: Store) { }

  ngOnInit() {  

   this.todolist$ = this.store.getTodoList()
   .pipe(
    map(todolist => todolist.filter(task => !task.iniciado && !task.finalizado)));

    // Teve que dar um subscribe aqui pois é necessário manter o fluxo de dados, o subscribe tem que ser iniciado em algum lugar.
    this.subscription = this.tasksService.getTodoList$.subscribe();
   
  }
  
  onToggle(event){
    this.tasksService.toggle(event);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Fechando a subscription
  }

}