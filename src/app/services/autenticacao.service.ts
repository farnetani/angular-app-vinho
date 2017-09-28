import { Injectable } from '@angular/core'
import { Http, Response } from '@angular/http'
import { Router } from '@angular/router'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class AutenticacaoService {

  private _usuarioLogado: boolean = false
  private _token: string

  constructor(private http: Http, private router: Router) { }

  login(login: string, senha: string): Promise<boolean> {
    // if (login === 'rodrigo' && senha === 'rodrigo') {
    //   this._usuarioLogado = true
    //   return Promise.resolve(true)
    // } else {
    //   this._usuarioLogado = false
    //   return Promise.resolve(false)
    // }

    return this.http.post('/login', JSON.stringify({ login: login, senha: senha }))
      .toPromise()
      .then((response: Response) => {
        if (response.json() && response.json().token) {
          this._token = response.json().token
          localStorage.setItem('usuarioSistema', JSON.stringify(response.json().usuario))
          return true
        } else {
          localStorage.removeItem('usuarioSistema')
          return false
        }
      })
  }

  // get usuarioLogado(): boolean {
  //   return this._usuarioLogado
  // }

  get usuarioLogado(): boolean {
    return localStorage.getItem('usuarioSistema') !== null
  }

  logout(): void {
    this._token = null
    localStorage.removeItem('usuarioSistema')
    this.router.navigate(['/login'])
  }

  get nomeUsuarioLogado(): string {
    if (localStorage.getItem('usuarioSistema') !== null) {
       return JSON.parse(localStorage.getItem('usuarioSistema')).nome
    } else {
      return 'Usuário não autenticado no sistema!'
    }
  }

  get token(): string {
    return this._token
  }

}
