import { Component, OnInit } from '@angular/core'

import { state, trigger, style, transition, animate } from '@angular/animations'

import { Notificacao } from '../../models/notificacao'
import { NotificacaoService } from '../../services/notificacao.service'

@Component({
  selector: 'farsoft-notificacao',
  templateUrl: './notificacao.component.html',
  styleUrls: ['./notificacao.component.scss'],
  animations: [
    trigger('visibilidade', [
      state('visivel', style({
        opacity: 1
      })),
      state('naoVisivel', style({
        opacity: 0
      })),
      transition('visivel => naoVisivel', animate('.5s')),
      transition('naoVisivel => visivel', animate('.5s'))
    ])]
})
export class NotificacaoComponent implements OnInit {

  notificacao: Notificacao
  // tslint:disable-next-line:no-inferrable-types
  status: string = 'naoVisivel'

  constructor(public notificacaoService: NotificacaoService) { }

  ngOnInit() {
    this.notificacaoService.obterNotificacoes().subscribe((notificacao: Notificacao) => {
      this.notificacao = notificacao
      this.status = 'visivel'
      setTimeout(() => {
        this.status = 'naoVisivel'
      }, 2000)
    })
  }

  tipoAlerta() {
    return this.notificacao.tipo
  }

}
