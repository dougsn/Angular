import { Inject, Injectable, Injector } from "@angular/core";
import { BAR_UNIDADE_CONFIG, BarUnidadeConfig } from "./bar.config";


export function BarFactory(inject: Injector) {
    return new BarServices(inject.get(BAR_UNIDADE_CONFIG));
}

@Injectable()
export class BarServices {

    constructor(@Inject(BAR_UNIDADE_CONFIG) private config: BarUnidadeConfig) { }

    obterUnidades(): string {
        return `Unidade ID: ${this.config.unidadeId} - Token: ${this.config.unidadeToken}`;
    }
    
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

export abstract class BebidaService {
    obterBebidas: () => string;
}