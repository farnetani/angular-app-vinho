import { Component } from '@angular/core'
import { RouterLinkActive } from '@angular/router'
import { AutenticacaoService } from './services/autenticacao.service';


@Component({
  selector: 'farsoft-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

constructor(private autenticacaoService: AutenticacaoService) { }

 dataHoje = new Date()

 title = 'farsoft'
}
