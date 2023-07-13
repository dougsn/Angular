import { Routes } from '@angular/router';
import { CadastroComponent } from './pratica/reactiveForms/cadastro/cadastro.component';
import { HomeComponent } from './pratica/reactiveForms/navegacao/home/home.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'cadastro', component: CadastroComponent }
];