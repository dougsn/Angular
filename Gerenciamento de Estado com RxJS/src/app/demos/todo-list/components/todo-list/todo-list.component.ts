import { EventEmitter } from '@angular/core';
import { Component, Input, Output } from '@angular/core';
import { Task } from "../../task";

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['todo-list.component.css']  
})
export class ToDoListComponent {

  @Input() // Recebendo uma lista de tarefas.
  list: Task[];

  @Output() // Evento provocado
  toggle = new EventEmitter<any>(); // Evento emitido


  toggleItem(index: number, acao: string) {
    const task = this.list[index]; // Buscando a lista que tem o index que será repassado, da sua identificação.

    switch(acao) {
      case 'iniciar':
        task.finalizado = false;
        task.iniciado = true;
        break;
      case 'finalizar':
        task.finalizado = true;
        task.iniciado = false;
        break;
      case 'retomar':
        task.finalizado = false;
        task.iniciado = true;
        break;
      case 'cancelar':
        task.finalizado = false;
        task.iniciado = false;
        break;
    }

    this.toggle.emit({
      task: { ...task }
    });
    
  }

}