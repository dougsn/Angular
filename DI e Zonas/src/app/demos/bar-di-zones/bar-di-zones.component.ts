import { Component, Inject, Injector, OnInit } from '@angular/core';
import { BarFactory, BarServices, BebidaService } from './bar.service';
import { BAR_UNIDADE_CONFIG, BarUnidadeConfig } from './bar.config';

@Component({
  selector: 'app-bar-di-zones',
  templateUrl: './bar-di-zones.component.html',
  providers: [
    // { provide: BarServices, useClass: BarServices },
    {
      provide: BarServices, useFactory: BarFactory, 
      deps: [
        Injector
      ]
    },
    { provide: BebidaService, useExisting: BarServices }
  ]
})
export class BarComponent implements OnInit {

  configManual: BarUnidadeConfig;
  config: BarUnidadeConfig;
  barBebida1: string;
  barBebida2: string;
  dadosUnidade: string;

  constructor( 
    private barServices: BarServices,
    @Inject('ConfigManualUnidade') private ApiConfigManual: BarUnidadeConfig,
    @Inject(BAR_UNIDADE_CONFIG) private ApiConfig: BarUnidadeConfig,
    private bebidaService: BebidaService
   ) { }

  ngOnInit() {
    this.barBebida1 = this.barServices.obterBebidas();
    this.configManual = this.ApiConfigManual;
    
    this.config = this.ApiConfig;
    this.dadosUnidade = this.barServices.obterUnidades();

    this.barBebida2 = this.bebidaService.obterBebidas();

  }

}
