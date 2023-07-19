import { Injectable } from '@angular/core/'
import { CanActivate, CanLoad } from '@angular/router';

@Injectable() 
export class AuthGuard implements CanLoad, CanActivate {

    user = { admin: true, logged: true }

    canLoad() : boolean { // Permite carregar o modulo
        return this.user.admin;
    }

    canActivate() : boolean { // Permite navegar até o modulo
        return this.user.logged;
    }

}