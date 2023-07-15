import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Produto } from "../../models/produto";


@Component({
    selector: 'produto-card-detalhe', // Se atentar ao nome, pois é utilizando no HTML do component Pai para ser renderizado.
    templateUrl: './produto-card-detalhe.component.html'
})

export class ProdutoDetalheComponent{

    @Input() // Recebendo o produto do component Pai para o component Filho e sendo montado no HTML do component Filho.
    produto: Produto;

    @Output() // Mandando um evento para o component Pai.
    status: EventEmitter<any> = new EventEmitter();



    emitirEvento() { // Função que está sendo utilizando no HTML.
        this.status.emit(this.produto); // Enviando o Produto para o component Pai.
    }
}