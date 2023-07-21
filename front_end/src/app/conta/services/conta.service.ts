import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators"
import { Usuario } from "../models/usuario";
import { BaseService } from "src/app/services/base.service";



@Injectable()
export class ContaService extends BaseService {

  constructor(private http: HttpClient) { super(); }


  registrarUsuario(usuario: Usuario) : Observable<Usuario> {
    let response = this.http
      .post(this.UrlServiceV1 + 'nova-conta', usuario, this.ObterHeaderJson())
      .pipe(
        map(this.extractData), // Pegando o resultado do 'data' do backend.
        catchError(this.serviceError)); // Tratando o erro.

        return response;

  }

  login(usuario: Usuario) {

  }

}
