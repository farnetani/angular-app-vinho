import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { VinhosService } from '../../services/vinhos.service'
import { Vinho } from './../../models/vinho'

import { NotificacaoService } from '../../services/notificacao.service';

@Component({
  selector: 'farsoft-vinhos',
  templateUrl: './vinhos.component.html',
  styleUrls: ['./vinhos.component.scss']
})
export class VinhosComponent implements OnInit {

  vinhos: Array<Vinho>
  vinhoSelecionado: Vinho
  campoBusca: string

  constructor(public vinhosService: VinhosService, public router: Router, public notificacaoService: NotificacaoService) { }

  // Com promisses
  // ngOnInit() {
  //   //this.vinhos = this.vinhosService.listar()
  //   this.vinhosService.listar()
  //     .then((vinhos: Array<Vinho>) => {
  //       this.vinhos = vinhos
  //     }).catch((error: any) => {
  //       console.log(error)
  //     })
  // }

  ngOnInit() {
    //this.vinhos = this.vinhosService.listar()
    this.listar()
  }

  private listar() {
    this.vinhosService.listar()
    .subscribe((vinhos: Array<Vinho>) => {
      this.vinhos = vinhos
    })
  }

  selecionar(vinho: Vinho) {
    this.vinhoSelecionado = vinho
  }

  visualizar() {
    this.router.navigate(['/detalhes-vinho', this.vinhoSelecionado.id])
  }

  editar() {
    this.router.navigate(['/cadastro-vinho', this.vinhoSelecionado.id])
  }

  remover() {
    this.vinhosService.remover(this.vinhoSelecionado.id)
      .then(response => {
        console.log(response.status)

        this.notificacaoService.alerta('Vinho removido com sucesso!')
        this.listar()

      }).catch(erro => console.log(erro))
  }
}
