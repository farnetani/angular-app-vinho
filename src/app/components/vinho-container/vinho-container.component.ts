import { Component, OnInit, Input } from '@angular/core';
import { Vinho } from '../../models/vinho'

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vinho-container',
  templateUrl: './vinho-container.component.html',
  styleUrls: ['./vinho-container.component.scss']
})
export class VinhoContainerComponent implements OnInit {

  @Input() vinho: Vinho

  constructor() { }

  ngOnInit() {
  }

}
