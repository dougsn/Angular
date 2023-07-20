import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from './task';


export interface State {
    todolist: Task[];
}

const state: State = {
    todolist: []
};

/*

A Store é alimentado pelo Serviço

*/

export class Store {
    // Responsavel por propagar o estado atual da store.
    private subject = new BehaviorSubject<State>(state);       
    private store = this.subject.asObservable();

    get value() {
        return this.subject.value;
    }

    public getTodoList() : Observable<Task[]> { // Obtando a coleção
        return this.store
            .pipe(map(store => store.todolist));
    }

    set(name: string, state: any) { // Setando um novo estado para a Store
        this.subject.next({
            ...this.value, [name] : state
        })
    }

}