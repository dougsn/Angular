import { Component, OnInit } from '@angular/core';
import { BarServices } from './bar.service';

@Component({
  selector: 'app-bar-di-zones',
  templateUrl: './bar-di-zones.component.html',
  providers: [
    { provide: BarServices, useClass: BarServices }
  ]
})
export class BarComponent implements OnInit {

  barBebida1: string;

  constructor( private barServices: BarServices ) { }

  ngOnInit() {
    this.barBebida1 = this.barServices.obterBebidas();
  }

}
