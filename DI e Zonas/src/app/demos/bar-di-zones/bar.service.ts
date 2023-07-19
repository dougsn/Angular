import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"


@Injectable()
export class BarServices {

    constructor() { }

    obterBebidas(): string {
        return 'Bebidas';
    }


    obterPorcoes(): string {
        return 'Porções';
    }

    obterRefeicoes(): string {
        return 'Refeições';
    }
}