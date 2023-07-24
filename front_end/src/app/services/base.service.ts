import { LocalStorageUtils } from './../utils/localstorage';
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http"
import { throwError } from "rxjs";



export abstract class BaseService {

  public LocalStorage = new LocalStorageUtils();
  protected UrlServiceV1: string = "https://localhost:5001/api/v1/"

  protected ObterHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // Mandando o Header com o Token para validar se pode ou não fazer algo na aplicação.
  protected ObterAuthHeaderJson() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.LocalStorage.obterTokenUsuario()}`
      })
    }
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
    let customError: string[] = [];

    if (response instanceof HttpErrorResponse) {
      // Poderia pegar o status (que é o 500, 404, 200 ...)
      if (response.statusText === 'Unknown Error') {
        customError.push("Ocorreu um erro desconhecido");
        response.error.errors = customError;
      }
    }

    console.log(response);
    return throwError(response);
  }

}
