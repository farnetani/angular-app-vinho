import { Component, OnInit } from '@angular/core'

import { Router, ActivatedRoute, Params } from '@angular/router'
import { Vinho } from '../../models/vinho'
import { VinhosService } from '../../services/vinhos.service'
import { NotificacaoService } from '../../services/notificacao.service'

@Component({
  selector: 'farsoft-cadastro-vinho',
  templateUrl: './cadastro-vinho.component.html',
  styleUrls: ['./cadastro-vinho.component.scss']
})
export class CadastroVinhoComponent implements OnInit {

  vinho: Vinho
  uvas: Array<string>
  classificacoes: Array<string>
  titulo: string

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private vinhosService: VinhosService, private notificacaoService: NotificacaoService){ }

  ngOnInit() {
    this.inicializarValoresCadastro()
  }

  private inicializarValoresCadastro(): void {
    this.vinho = new Vinho()
    this.uvas = ['Cabernet Sauvignon', 'Merlot', 'Carmenére', 'Syrah']
    this.classificacoes = ['Tinto', 'Branco', 'Verde']
    this.titulo = 'Cadastro de Vinho'

    this.activatedRoute.params.forEach((params: Params) => {
      let id = +params['id']
      if (id) {
        this.titulo = 'Edição de Vinhos'
        this.carregarVinho(id)
      }
    })
  }

  private carregarVinho(id: number){
    this.vinhosService.buscar(id)
      .then(vinho => {
        this.vinho = vinho
      }).catch(erro => console.log(erro))
  }

  voltar(): void {
    this.router.navigate(['/vinhos'])
  }

  salvar() {
    if (this.vinho.id){
      this.atualizar()
    } else {
      this.cadastrarNovo()
    }
  }

  cadastrarNovo() {
    this.vinhosService.cadastrar(this.vinho)
    .then(response => {
      console.log(JSON.stringify(response))
      alert('Vinho cadastrado com sucesso')
      this.router.navigate(['/vinhos'])
    })
    .catch(error => {
      alert('Erro ao cadastrar o vinho')
      console.log(error)
    })
  }

  atualizar() {
    this.vinhosService.atualizar(this.vinho.id, this.vinho)
      .then(response => {
        this.notificacaoService.sucesso('Vinho atualizado com sucesso')

        console.log(JSON.stringify(response))
        this.router.navigate(['/vinhos'])
      })
      .catch(error => {
        alert('Erro ao atualizar o vinho')
        console.log(error)
      })
  }
}
