import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './models/usuario';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  MASKS = utilsBr.MASKS;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]) // A senha deve ter entre 6 e 15 caracteres,
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]), CustomValidators.equalTo(senha)]) // // A senha deve ter entre 6 e 15 caracteres, e tem que ser igual a senha que acabou de declarar.



    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]], // Esse campo tem que ser preenchido (Validators.required), seu tamanho min é 2 e max é 150 caracteres.
      cpf: ['', [Validators.required, NgBrazilValidators.cpf]],
      email: ['', [Validators.required, Validators.email]], // Array de validações para verificar se é requerido ou se é e-mail.
      senha: senha, 
      senhaConfirmacao: senhaConfirm
    })
  }

  adicionarUsuario() {
    if(this.cadastroForm.dirty && this.cadastroForm.valid) { // Para enviar/processar o formulario tem q estar valido e preenchido.
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value); // Preenchedo o usuário com os dados do formulário, primeiro diz qual é o objeto que se espera retornar (this.usuario), depois a referencia a fonte da informação que vai popular (this.cadastroForm.value) -> com isso o usuário será populado com os dados do Formulário.
      console.log(this.usuario);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    } else {
      this.formResult = "Não submeteu!!!"
    }
    
  }

}


// No input de cada campo do formulário é necessário colocar o formControlName="nome" para pegar o valor do campo no formGroup
// Também é necessário colocar o [formGroup]="cadastroForm" no formulário, para que ele seja encapsulado e poder pegar os seus valores no formGroup

// (ngSubmit)="adicionarUsuario()" -> Colocar no formulário para poder executar a função adicionarUsuario() quando o form foi submetido.

// O FormBuilder é um boa prática de se trabalhar com formulários.





// Validação básica de formulário

/*
  - Colocar o Validators.required no campo do group do FormBuilder do formulário especificado.

  - Usar a diretiva *ngIf para verificar se o campo está com erros, se foi preenchido(dirty) ou se foi "tocado"(touched), com essas condições básicas, o span com a mensagem de erro aparece.

  - E colocar no input um [ngClass] com a mesma validação, para mudar a classe do input e deixa-lo vermelho, indicando um erro no preenchimento.
  
 * Isso é em cada input *

  - Para desabilitar o botão de submiter o formulário e deixa-lo sob responsabilidade do Angular, basta colocar o seguinte no btn
    -> [disabled]="!cadastroForm.valid" => Se o formulário não estiver válido, deixa o botão desabilitado.

  - Para múltiplas validações em um campo, criar um Array de Validators para no FormBuilder ([Validators.required, Validators.email]).
   E no arquivo html criar 2 spans para cada erro (*ngIf="cadastroForm.get('email')?.errors?.required) ou *ngIf="cadastroForm.get('email')?.errors?.email) o ? antes e depois do erros serve para não ocasionar um erro null.

   - Para validar o cpf foi utilizada a ng-brazil para utilizar as mascaras do cpf. Foi colocado no input: cpf [textMask]="{mask: MASKS.cpf.textMask}", para fazer a máscara do cpf e no arquivo .ts foi inciado fora do onInit: MASKS = utilsBr.MASKS;
   
  - Para validar a senha e confirmação de senha foi utilizado o CustomValidator da lib ng2-validation, para poder validar o range de caracteres e também comparar a confirmação de senha com a senha utilizando o equalTo().
*/

// <span class="text-danger" *ngIf="cadastroForm.get('nome').errors && 
// (cadastroForm.get('nome').dirty || cadastroForm.get('nome').touched)">
// <p>Preencha o campo nome</p>
// </span>

// [ngClass]="{'is-invalid': cadastroForm.get('nome').errors && 
// (cadastroForm.get('nome').dirty || cadastroForm.get('nome').touched)}"/>