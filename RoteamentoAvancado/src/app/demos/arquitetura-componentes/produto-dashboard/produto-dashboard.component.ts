import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Produto } from '../models/produto';
import { Observable, fromEvent } from 'rxjs';
import { ProdutoCountComponent } from './components/produto-count.component';
import { ProdutoDetalheComponent } from './components/produto-card-detalhe.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produto-dashboard.component.html',
  styles: []
})
export class ProdutoDashboardComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute){}

  produtos: Produto[] // Lista de produto que é passando para o component Filho

  @ViewChild(ProdutoCountComponent, { static: false }) contador: ProdutoCountComponent;
  @ViewChild('teste', { static: false }) mensagemTela: ElementRef; // Pegando a referencia do token #teste, que foi colocado no HTML deste component.
  @ViewChildren(ProdutoDetalheComponent) botoes: QueryList<ProdutoDetalheComponent>; // Lista do elemento ProdutoDetalheComponent.


  ngOnInit() {
    this.produtos = this.route.snapshot.data['produtos'];
    console.log(this.route.snapshot.data['teste']);
    
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
