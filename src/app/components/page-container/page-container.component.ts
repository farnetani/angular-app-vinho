import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.scss']
})
export class PageContainerComponent implements OnInit {

  @Input() titulo: string
  @Output() acaoVoltar: EventEmitter<string> = new EventEmitter()

  constructor(private router: Router) { }

  ngOnInit() {
  }

  voltar(): void {
    this.acaoVoltar.emit()
  }
}
