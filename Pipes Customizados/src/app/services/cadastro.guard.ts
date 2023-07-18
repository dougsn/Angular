import { Injectable } from '@angular/core/'
import { CanActivate, CanDeactivate, CanLoad } from '@angular/router';
import { CadastroComponent } from '../demos/reactiveForms/cadastro/cadastro.component';

@Injectable() 
export class CadastroGuard implements CanDeactivate<CadastroComponent> {


    // Para sair, é necessário confirmar se quer perder o dados do formulário ou não.
    canDeactivate(component: CadastroComponent) {
        
        if(component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja abandonar o preenchimento do formulário?')
        }

        return true;
    }

    
}