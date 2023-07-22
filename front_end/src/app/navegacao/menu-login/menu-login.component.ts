import { Router } from '@angular/router';
import { LocalStorageUtils } from './../../utils/localstorage';
import { Component } from "@angular/core";


@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html'
})
export class MenuLoginComponent {

  token: string = "";
  user: any;
  email: string = "";
  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  usuarioLogado(): boolean {
    this.token = this.localStorageUtils.obterTokenUsuario();
    this.user = this.localStorageUtils.obterUsuario();

    // Se o usuario existir, pega o e-mail na propriedade do token e atribui a variavel do componente
    if (this.user) this.email = this.user.email;
    return this.token !== ""; // Se tiver token retorna true, caso contrario retorna false (usuario não está logado.)
  }

  logout() {
    this.localStorageUtils.limparDadosLocaisUsuario();
    this.router.navigate(['/home']);
  }

}
