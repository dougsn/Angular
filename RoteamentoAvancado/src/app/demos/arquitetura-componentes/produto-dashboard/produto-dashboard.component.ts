import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable, fromEvent } from 'rxjs';
import { ProdutoCountComponent } from './components/produto-count.component';
import { ProdutoDetalheComponent } from './components/produto-card-detalhe.component';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produto-dashboard.component.html',
  styles: []
})
export class ProdutoDashboardComponent implements OnInit, AfterViewInit {

  produtos: Produto[] // Lista de produto que é passando para o component Filho

  @ViewChild(ProdutoCountComponent, { static: false }) contador: ProdutoCountComponent;
  @ViewChild('teste', { static: false }) mensagemTela: ElementRef; // Pegando a referencia do token #teste, que foi colocado no HTML deste component.
  @ViewChildren(ProdutoDetalheComponent) botoes: QueryList<ProdutoDetalheComponent>; // Lista do elemento ProdutoDetalheComponent.

  constructor() { }

  ngOnInit() {
    this.produtos = [{
      id: 1,
      nome: 'Teste',
      ativo: true,
      valor: 100,
      imagem: 'celular.jpg'
    },
    {
      id: 2,
      nome: 'Teste 2',
      ativo: true,
      valor: 200,
      imagem: 'gopro.jpg'
    },
    {
      id: 3,
      nome: 'Teste 3',
      ativo: true,
      valor: 300,
      imagem: 'laptop.jpg'
    },
    {
      id: 4,
      nome: 'Teste 4',
      ativo: true,
      valor: 400,
      imagem: 'mouse.jpg'
    },
    {
      id: 5,
      nome: 'Teste 5',
      ativo: true,
      valor: 500,
      imagem: 'teclado.jpg'
    },
    {
      id: 6,
      nome: 'Teste 6',
      ativo: false,
      valor: 600,
      imagem: 'headset.jpg'
    }];
  }
  
  ngAfterViewInit(): void {

    console.log(`Objeto do Contador: ${this.contador.produtos}`);


    let clickTexto: Observable<any> = fromEvent(this.mensagemTela.nativeElement, 'click'); // Observando o evento click do elemento mensagemTela
    clickTexto.subscribe(() => {
      alert('clicou no texto')
      return;
    });

    console.log(this.botoes);
    this.botoes.forEach(p => {
      console.log(p.produto);     
    })
    
  }

  mudarStatus(event: Produto){ // Se estiver ativo vai para inativo e vise-versa.
    event.ativo = !event.ativo; // Aqui teria a comunicação com a API para inverter na base de dados e mudar o status.  
  }

}
