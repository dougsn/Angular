import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CadastroComponent } from './pratica/reactiveForms/cadastro/cadastro.component';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { HomeComponent } from './pratica/reactiveForms/navegacao/home/home.component';
import { FooterComponent } from './pratica/reactiveForms/navegacao/footer/footer.component';
import { MenuComponent } from './pratica/reactiveForms/navegacao/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,  
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forRoot(rootRouterConfig, { useHash: false})]
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
