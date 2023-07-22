import { Component } from '@angular/core';
import { Fornecedor } from '../models/fornecedor';

import { ActivatedRoute, Params } from '@angular/router';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html'
})
export class DetalhesComponent {

  fornecedor: Fornecedor = new Fornecedor();

  constructor(
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService) {

      const id = (route.params as Params)['id']
      this.fornecedorService.obterPorId(id)
      .subscribe(fornecedor => this.fornecedor = fornecedor);
  }
}
