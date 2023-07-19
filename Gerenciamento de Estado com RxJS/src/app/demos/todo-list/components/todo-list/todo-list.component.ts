import { Component, Input } from '@angular/core';
import { Task } from "../../task";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['todo-list.component.css']  
})
export class ToDoListComponent {

  @Input() // Recebendo uma lista de tarefas.
  list: Task[];
}