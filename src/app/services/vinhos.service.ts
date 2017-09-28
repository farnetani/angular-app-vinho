import { Injectable } from '@angular/core'
import { Http, Request, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http'

import { Vinho } from './../models/vinho'
//import 'rxjs/add/operator/toPromise'
import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/toPromise'
import { AutenticacaoService } from './autenticacao.service'

@Injectable()
export class VinhosService {

  //private apiUrl: string = '/vinhos'
  private apiUrl: string = 'localhost:3000/vinhos'

  constructor(private http: Http, private autenticacaoService: AutenticacaoService) { }

  // listar(): Array<Vinho> {
  //   let vinhos: Array<Vinho>
  //   vinhos = new Array<Vinho>()
  //   vinhos.push(this.criarVinho(1, 'Casillero Del Diablo', 'Cabernet Sauvignon', 'tinto', 'Concha y Toro', 2010, 'Chile'))
  //   vinhos.push(this.criarVinho(2, 'Casillero Del Diablo', 'Merlot', 'tinto', 'Concha y Toro', 2015, 'Chile'))
  //   return vinhos
  // }

  // listar(): Promise<Array<Vinho>> {
  //   // let vinhos: Array<Vinho>
  //   // vinhos = new Array<Vinho>()
  //   // vinhos.push(this.criarVinho(1, 'Casillero Del Diablo', 'Cabernet Sauvignon', 'tinto', 'Concha y Toro', 2010, 'Chile'))
  //   // vinhos.push(this.criarVinho(2, 'Casillero Del Diablo', 'Merlot', 'tinto', 'Concha y Toro', 2015, 'Chile'))    
  //   // return Promise.resolve(vinhos)
  //   return this.http.get('api/vinhos')
  //     .toPromise()
  //     .then(response => response.json().data as Array<Vinho>)
  //     .catch(this.tratarErro)
  // }

  listar(): Observable<Array<Vinho>> {
    return this.http.get(this.apiUrl, this.header())
      //.map(response => response.json().data as Array<Vinho>)
      .map(response => response.json() as Array<Vinho>)
      //.map(response => response.json().data as Array<Vinho>)
      //.map(response => console.log(response.json()))
      .catch(this.tratarErro)
  }

  private tratarErro(erro: any): Observable<any> {
    console.log(erro)
    return Observable.throw(erro.message | erro)
  }


  // Do tipo promise
  // private tratarErro(erro: any): Promise<any> {
  //   console.log(erro)
  //   return Promise.reject(erro.message | erro)
  // }

  // private criarVinho(id: number, nome: string, uva: string,
  //   classificacao: string, fabricante: string, anoSafra: number,
  //   paisOrigem: string): Vinho {
  //   let vinho: Vinho = new Vinho()
  //   vinho.id = id
  //   vinho.nome = nome
  //   vinho.uva = uva
  //   vinho.classificacao = classificacao
  //   vinho.fabricante = fabricante
  //   vinho.anoSafra = anoSafra
  //   vinho.paisOrigem = paisOrigem
  //   return vinho
  // }

  cadastrar(vinho: Vinho): Promise<Response> {
    return this.http.post(this.apiUrl, JSON.stringify(vinho), this.header())
      .toPromise()
      .then(response => response)
      .catch(this.tratarErro)
  }

  buscar(id: number): Promise<Vinho> {
    return this.http.get(`'${this.apiUrl}/${id}`, this.header())
      .toPromise()
      // .then(response => response.json().data as Vinho)
      .then(response => response.json() as Vinho)
      .catch(this.tratarErro)
  }

  atualizar(id: number, vinho: Vinho): Promise<Response> {
    return this.http.put(`${this.apiUrl}/${id}`, vinho, this.header())
      .toPromise()
      .then(response => response)
      .catch(this.tratarErro)
  }

  remover(id: number): Promise<Response> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.header())
      .toPromise()
      .then(response => response)
      .catch(this.tratarErro)
  }

  private header(): RequestOptions {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.autenticacaoService.token })
    let requestOptions = new RequestOptions({ headers: headers })
    return requestOptions
  }

}
