import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';
import { utilsBr } from 'js-brasil';
import { NgBrazilValidators } from 'ng-brazil';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './models/usuario';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

  // O ViewChildren é uma implementação para obter uma coleção dos itens de seu formulário.
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  usuario: Usuario;
  formResult: string = '';
  MASKS = utilsBr.MASKS;

  // Itens para tratamento avançado do formulário.
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  // 

  constructor(private fb: FormBuilder) { 
    this.validationMessages = { // Coleção de mensagens de validação, conforme a regra que se espera (required, equalTo e etc.)
      nome: { // Essas 'chaves' são definidas com base no Validator do FormBuilder.
        required: "O nome é requerido",
        minlength: "O nome precisa ter no mínimo 2 caracteres",
        maxlength: "O nome precisa ter no máximo 150 caracteres"
      },
      cpf: {
        required: "Informe o CPF",
        cpf: "CPF em formato inválido"
      },
      email: {
        required: "Informe o e-mail",
        email: "E-mail inválido"
      },
      senha: {
        required: "Informe a senha",
        rangeLength: "A senha deve possuir entre 6 e 15 caracteres"
      },
      senhaConfirmacao: {
        required: "Informe a senha novamente",
        rangeLength: "A senha deve possuir entre 6 e 15 caracteres",
        equalTo: "As senhas não conferem"
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages); // Dizendo para o genericValidator quais são as mensagens de validação.
  }

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

  
  ngAfterViewInit(): void { // Interface que é chamada assim que o HTML foi disponibilizado para o Browser (Que está visivel.)
    
    // o controlBlurs é uma coleção de Observables, onde essa coleção de Observables vai ser criada com base no mapeamentos de cada item do formulário, atraves do evento 'blur'.  
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    // o merge vai pegar a coleção de observables que é o controlBlurs (... é o spreedOperator, o que faz para 1 faz para todos)
    merge(...controlBlurs).subscribe(() => {
      // Para cada vez que a Observable for ativada, via 'blur', ele vai chamar o processarMensagens. 
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    });

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
  
  - <span class="text-danger" *ngIf="cadastroForm.get('nome').errors && 
  - (cadastroForm.get('nome').dirty || cadastroForm.get('nome').touched)">
  - <p>Preencha o campo nome</p>
  - </span>


  - [ngClass]="{'is-invalid': cadastroForm.get('nome').errors && 
  - (cadastroForm.get('nome').dirty || cadastroForm.get('nome').touched)}"/>

  */

// Validação avançada de formulário

/*

- Para começar a validação avançada foi importado um arquivo .ts de nome generic-form-validation que trata os erros.

- Foram criados variaveis para serem utilizadas no tratamento do formulario:  validationMessages: ValidationMessages; genericValidator: GenericValidator; displayMessage: DisplayMessage = {};

- E no construtor foi foi dado valor ao validationMessages, conforme a regra que se espera no Validadors do FormBuilder.
  
- this.genericValidator = new GenericValidator(this.validationMessages) => foi dado valor para o genericValidator para ser utilizado na interface AfterViewInit.

- Foi criado um ViewChildren para obter uma coleção dos itens do formulário, que será utilizado na validação dos campos.
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

- Com isso, foi usado e implementado a interface AfterViewInit, essa interface é chamada assim que o HTML foi disponibilizado para o Browser. Dentro do ngAfterViewInit foi criado uma coleção de Observables, onde cessa coleção de Observables vai ser criado com base no mapeamento de cada item do formulário, atraves do 'blur', com a implementação abaixo..:

    let controlBlurs: Observable<any>[] = this.formInputElements
  .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

- O merge vai pegar a coleção de observables que é o controlBlurs e dar um subscribe em cada item que atender a condição, que no caso é o evento 'blur' no input e vai chamar o método processarMensagem.

  merge(...controlBlurs).subscribe(() => {
    this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);

- No HTML foi substituido a verbosidade do [ngClass]... por: [ngClass]="{'is-invalid': displayMessage.nome }", que faz a mesma tratativa, mas de forma assincrona deixando o código mais legível.
- E também foi substituido a verbosidade do *ngIf... por <span *ngIf="displayMessage.nome"><p [innerHTML]="displayMessage.nome"></p></span>
- De ambas as formas a condição e o texto inserido no innerHTML é realizado de forma assincrona, que pega das configurações feitas no arquivo .TS e dispoe no HTML.

*/
