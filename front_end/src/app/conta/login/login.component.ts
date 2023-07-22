import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { ContaService } from '../services/conta.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';


import { Observable, fromEvent, merge } from 'rxjs';
import { CustomValidators } from '@narik/custom-validators';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements!: ElementRef[];

  errors: any[] = [];
  loginForm!: FormGroup;
  usuario!: Usuario;

  validationMessages!: ValidationMessages;
  genericValidator!: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private fb: FormBuilder, private contaService: ContaService, private router: Router, private toastr: ToastrService) {

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'E-mail inválido'
      },
      password: {
        required: 'Informe a senha',
        rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, CustomValidators.rangeLength([6,15])]]
    });
  }


  ngAfterViewInit(): void {

    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.loginForm);
    })

  }

  login() {
    if(this.loginForm.dirty && this.loginForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.loginForm.value); // Convertendo e montando o usuario com os valores do formulario

      this.contaService.login(this.usuario)
        .subscribe( // Dando subscribe para mandar para o backend e tratando abaixo.
          sucesso => {this.processarSucesso(sucesso)},
          falha => {this.processarFalha(falha)}
        );
    }
  }

  processarSucesso(response: any){
    this.loginForm.reset(); // Limpando Formulário
    this.errors = []; // Zerando os erros.

    this.contaService.LocalStorage.salvarDadosLocaisUsuario(response); // Salvando o usuario e seu token JWT no localStorage.

    let toast = this.toastr.success("Login realizado com sucesso!", "Bem vindo!!!", {
      timeOut: 1500,
      closeButton: true,
      progressBar: true
    });

    if(toast) {
      toast.onHidden.subscribe(() => { // Depois que o toastr sumir, redireciona para a home
        this.router.navigate(['/home']) // Depois que cadastrar é redirecionado para HOME
      });
    }
  }

  processarFalha(fail: any){
    this.errors = fail.error.errors;
    this.toastr.error("Ocorreu um erro!", "Opa :(", {
      timeOut: 1500,
      closeButton: true,
      progressBar: true
    });
  }


}
