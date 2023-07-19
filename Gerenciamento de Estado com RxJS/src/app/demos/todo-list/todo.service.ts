import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Task } from './task';

@Injectable()
export class TasksService {

  constructor(private http: HttpClient) { }

  
}