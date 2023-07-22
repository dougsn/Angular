import { LocalStorageUtils } from './../../utils/localstorage';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { CadastroComponent } from "../cadastro/cadastro.component";
import { Observable } from "rxjs";


@Injectable()
export class ContaGuard implements CanDeactivate<CadastroComponent>, CanActivate{

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  canDeactivate(component: CadastroComponent){
    if(component.mudancasNaoSalvar) {
      return window.confirm("Tem certeza que deseja abandonar o preenchimento do formulário?"); // Se a mudancaNaoSalva for true, ele pode sair se não ele fica na rota
    }
    return true; // Se ele clicar em sim, ele sai da rota e perde os dados do formulario
  }

  canActivate() {
      if(this.localStorageUtils.obterTokenUsuario()) {  // Se o usuário tiver o token no localStorage, quer dizer que está logado e não poderá acessar o form de cadastro e será redirecionado para a Home.
        this.router.navigate(['/home']);
      }
      return true; // Caso contrario ele pode entrar no formulário de cadastro
  }

}
