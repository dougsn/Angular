import { map } from 'rxjs/operators';
import { Store } from './../../todo.store';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TasksService } from '../../todo.service';

@Component({
  selector: 'tasks-iniciadas',
  templateUrl: './tasks-iniciadas.component.html'
})
export class TasksIniciadasComponent implements OnInit {

  iniciados$: Observable<any[]>;

  constructor(private tasksService: TasksService, private store: Store) {}

  ngOnInit() {
    
    this.iniciados$ = this.store.getTodoList() // Obtendo a lista de tarefas que está no Store
      .pipe( // E filtrando a lista pelos iniciado e as que não estão finalizadas.
        map(todolist => todolist.filter(task => task.iniciado && !task.finalizado))
      );

  }
}