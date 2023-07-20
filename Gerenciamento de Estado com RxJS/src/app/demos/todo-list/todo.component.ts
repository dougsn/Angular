import { Task } from './task';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TasksService } from './todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {

  tarefaForm: FormGroup;
  tarefa: Task;

  constructor(private fb: FormBuilder, private tasksService: TasksService) {}

  adicionar() {
    if (this.tarefaForm.dirty && this.tarefaForm.valid) {
      this.tarefa = Object.assign({}, this.tarefa, this.tarefaForm.value);
      
      this.tasksService.post(this.tarefa);
      this.tarefaForm.reset();
    }
  }
  
  ngOnInit() {
    this.tarefaForm = this.fb.group({
      nome: [''],      
    });
  }
}