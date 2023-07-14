import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProdutoDashboardComponent } from "./produto-dashboard/produto-dashboard.component";
import { ProdutoRouterModule } from "./produto.routes";



@NgModule({
    declarations: [
        ProdutoDashboardComponent,
    ],
    imports: [
        CommonModule,
        ProdutoRouterModule
    ],
    exports: [

    ]
})
export class produtoModule{}