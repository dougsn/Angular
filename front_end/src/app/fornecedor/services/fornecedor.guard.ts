import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { LocalStorageUtils } from 'src/app/utils/localstorage';


@Injectable()
export class FornecedorGuard implements CanActivate {

  localStorageUtils = new LocalStorageUtils();

  constructor(private router: Router) { }

  // Validando se pode ou não entrar na rota
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.localStorageUtils.obterTokenUsuario()) {
      this.router.navigate(['/conta/login']);
    }

    let user = this.localStorageUtils.obterUsuario(); // Pegando dados que foram gravados no localStorage
    let claim: any = route.data[0]; // Pegando o primeiro valor do array DATA que foi colocado no roteamento.

    if (claim !== undefined) {
      let claim = route.data[0]['claim']; // Pegando a chave claim que está no roteamento

      if (claim) {
        if (!user.claims) { // Se o usuário não tiver claims, manda para outro lugar
          this.navegarAcessoNegado();
        }

        let userClaims = user.claims.find((x: { type: any; }) => x.type === claim.nome); // O type dos claims do usuario tem que ser igual ao claim da rota (route)... A role da rota tem que ser igual ao que é recebido e salvo no localstorage.

        if (!userClaims) {
          this.navegarAcessoNegado();
        }

        let valoresClaim = userClaims.value as string; // Pegando o valor das roles do usuario em string.

        if (!valoresClaim.includes(claim.valor)) { // Se as claims forem diferentes, redireciona para outro local.
          this.navegarAcessoNegado();
        }
      }
    }

    return true;
  }

  navegarAcessoNegado() {
    this.router.navigate(['/acesso-negado'])
  }

}
