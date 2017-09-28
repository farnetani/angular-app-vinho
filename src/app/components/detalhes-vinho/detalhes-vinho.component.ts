import { Component, OnInit, Input } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Vinho } from '../../models/vinho'

import { VinhosService } from '../../services/vinhos.service'

@Component({
  selector: 'farsoft-detalhes-vinho',
  templateUrl: './detalhes-vinho.component.html',
  styleUrls: ['./detalhes-vinho.component.scss']
})
export class DetalhesVinhoComponent implements OnInit {

  vinho: Vinho = new Vinho()

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private vinhosService: VinhosService) { }

  ngOnInit() {
    this.vinho = new Vinho()
    this.activatedRoute.params.forEach((params: Params) => {
      let id = +params['id']
      if (id) {
        this.carregarVinho(id)
      }
    })
  }

  private carregarVinho(id: number) {
    this.vinhosService.buscar(id)
      .then((vinho: Vinho) => {
        this.vinho = vinho
      })
      .catch((error: any) => console.error(error))
  }

  private retornar(event: any) {
    event.preventDefault()
    this.router.navigate(['/vinhos'])
  }

  voltar(): void {
    this.router.navigate(['/vinhos'])
  }

}
