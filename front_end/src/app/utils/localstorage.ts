export class LocalStorageUtils {

  public obterUsuario() {
    const user = localStorage.getItem("devio.user");
    return user ? JSON.parse(user) : null;
  }

  public salvarDadosLocaisUsuario(response: any) {
    this.salvarTokenUsuario(response.accessToken);
    this.salvarUsuario(response.userToken);
  }

  public limparDadosLocaisUsuario() {
    localStorage.removeItem("devio.token");
    localStorage.removeItem("devio.user");
  }

  public obterTokenUsuario(): string {
    return localStorage.getItem("devio.token") ?? "";
  }

  public salvarTokenUsuario(token: string) {
    localStorage.setItem("devio.token", token);
  }

  public salvarUsuario(user: string) {
    localStorage.setItem("devio.user", JSON.stringify(user));
  }

}
