import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pessoa } from '../../shared/models/pessoaModel';
import { Store } from '../../shared/utils/util.store';
import { Vacina } from '../../shared/models/vacinaModel';
import { ClienteService } from '../../service/cliente.service';
import { LoaderService } from '../../service/loader.service';
import { CartaoVacinacaoResponse } from '../../shared/models/cartaoVacinaModel';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {

  clienteCadastrado: boolean = false;

  usuario: Pessoa = { id: '', cpf: '', nome: '', idade: 20, sexo: 'Masculino' };

  constructor(private router: Router, private store: Store, private clienteService: ClienteService, private lodareService: LoaderService) { }

  cadastrar(form: NgForm) {
    this.lodareService.show();
    this.usuario = form.value;
    this.store.set("clienteCadastro", this.usuario);
    this.clienteService.cadastroCliente(this.usuario).subscribe({
      next: (respose: CartaoVacinacaoResponse) => {
        this.store.set("vacinaResponse", respose)
        this.lodareService.hide();
        //Navega para componente de vacinacao
        this.router.navigate(['cartao-vacina']);
      }
    })
  }

  possuiCadastro() {
    this.clienteCadastrado = !this.clienteCadastrado;
  }

  entrar(form: NgForm) {
    this.lodareService.show();

    this.clienteService.loginCliente(form.value.cpf).subscribe({
      next: (respose: CartaoVacinacaoResponse) => {
        this.lodareService.hide();
        this.store.set("vacinaResponse", respose)
        this.lodareService.hide();
        //Navega para componente de vacinacao
        this.router.navigate(['cartao-vacina']);
      }
    })

  }
}
