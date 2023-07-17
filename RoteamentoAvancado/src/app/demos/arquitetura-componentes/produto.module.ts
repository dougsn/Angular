import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt); // Formatando a moeda para o formato brasileiro.

import { ProdutoDashboardComponent } from './produto-dashboard/produto-dashboard.component';
import { ProdutoRoutingModule } from './produto.route';
import { ProdutoDetalheComponent } from './produto-dashboard/components/produto-card-detalhe.component';
import { ProdutoCountComponent } from './produto-dashboard/components/produto-count.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { ProdutoAppComponent } from './produto.app.component';

@NgModule({
    declarations: [
        ProdutoDashboardComponent,
        ProdutoDetalheComponent,
        ProdutoCountComponent,
        EditarProdutoComponent,
        ProdutoAppComponent
    ],
    imports: [
        CommonModule,
        ProdutoRoutingModule
    ],
    exports: []
})
export class ProdutoModule { }