import { Component, Inject, Injector, NgZone, OnInit } from '@angular/core';
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
    private bebidaService: BebidaService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.barBebida1 = this.barServices.obterBebidas();
    this.configManual = this.ApiConfigManual;

    this.config = this.ApiConfig;
    this.dadosUnidade = this.barServices.obterUnidades();

    this.barBebida2 = this.bebidaService.obterBebidas();

  }

  public progress: number = 0;
  public label: string;

  processWithinAngularZone() {
    this.label = 'dentro';
    this.progress = 0;
    this._increaseProgress(() => console.log("Finalizado por dentro do Anular"));
  }

  processOutsideOfAngularZone() {
    this.label = 'fora';
    this.progress = 0;
    this.ngZone.runOutsideAngular(() => {
      this._increaseProgress(() => {
        this.ngZone.run(() => {
          console.log("Finalizado Fora do Angular!!");
        })
      })
    })
  }



  _increaseProgress(doneCallBack: () => void) {
    this.progress += 1;
    console.log(`Progresso atual: ${this.progress}%`);

    if (this.progress < 100) {
      window.setTimeout(() => this._increaseProgress(doneCallBack), 10);
    } else {
      doneCallBack();
    }

  }

}
