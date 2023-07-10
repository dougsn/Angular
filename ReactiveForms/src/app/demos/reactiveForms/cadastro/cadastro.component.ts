import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      senha: [''],
      senhaConfirmacao: ['']
    })
  }

  adicionarUsuario() {
    // let x = this.cadastroForm.value; // Pegando os valores do formulário

    this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value); // Preenchedo o usuário com os dados do formulário, primeiro diz qual é o objeto que se espera retornar (this.usuario), depois a referencia a fonte da informação que vai popular (this.cadastroForm.value) -> com isso o usuário será populado com os dados do Formulário.
    console.log(this.usuario);
    
    
  }

}


// No input de cada campo do formulário é necessário colocar o formControlName="nome" para pegar o valor do campo no formGroup
// Também é necessário colocar o [formGroup]="cadastroForm" no formulário, para que ele seja encapsulado e poder pegar os seus valores no formGroup

// (ngSubmit)="adicionarUsuario()" -> Colocar no formulário para poder executar a função adicionarUsuario() quando o form foi submetido.

// O FormBuilder é um boa prática de se trabalhar com formulários.