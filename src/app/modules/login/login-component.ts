import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {

  usuario = { cpf: '', nome: '', idade: null as number | null, sexo: '' };

  constructor(private router: Router) {}

  entrar() {
    //Navega para componente de vacinacao
    this.router.navigate(['cartao-vacina']);
  }
}
