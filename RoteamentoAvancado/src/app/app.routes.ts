import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { AuthGuard } from './services/app.guard';
import { CadastroGuard } from './services/cadastro.guard';

const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'sobre', component: SobreComponent }, // Para sair, tem 1 'guarda' para 'travar' a saida espontanea do componente.
    { path: 'cadastro', component: CadastroComponent, canDeactivate: [CadastroGuard] },
    { path: 'produtos', 
            loadChildren: () => import('./demos/arquitetura-componentes/produto.module')
            .then(m => m.ProdutoModule)},
    { path: 'admin', 
            loadChildren: () => import('./admin/admin.module')
            .then(m => m.AdminModule),
            canLoad: [AuthGuard], canActivate: [AuthGuard]}, // Colocando autenticação e autorização

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:[
        RouterModule.forRoot(rootRouterConfig, { enableTracing: true })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}