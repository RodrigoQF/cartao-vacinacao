import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Vacina } from '../../shared/models/vacinaModel';
import { Pessoa } from '../../shared/models/pessoaModel';
import { CartaoVacinacaoResponse } from '../../shared/models/cartaoVacinaModel';
import { MOCK_CARTAO } from '../../mocks/cartaoVacinaResponseMock';
import { Store } from '../../shared/utils/util.store';
import { VacinaService } from '../../service/vacina.service';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-cartao-vacina-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartao-vacina-component.html',
  styleUrl: './cartao-vacina-component.scss',
})
export class CartaoVacinaComponent implements OnInit {
  tipoModal: 'info' | 'add' | null = null;

  //Variavel usada ao clicar no botão 'editar'
  editandoVacina: boolean = false;

  cartaoVacina!: CartaoVacinacaoResponse;
  usuario?: Pessoa = {};
  vacinas: Vacina[] = [];

  //Variavel usada para identificar se cliente possui ou nao vacinas
  possuiVacina: boolean = false;

  //Variavel para quando cliente clica em alguma vacina específica, seja para editar, excluir ou visualizar
  vacinaSelecionada: Vacina = {
    id: '',
    nome: '',
    data: '',
    dose: '1ª Dose',
    fabricante: '',
  };

  constructor(
    private store: Store,
    private vacinaService: VacinaService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    //Variavel principal recebe valor da API que retorna informacoes do cliente
    this.cartaoVacina = this.store.value.vacinaResponse;

    //Valida se cliente tem ou nao vacina registrada, para exibicao ou nao do disclaimer
    this.possuiVacina = this.cartaoVacina.vacinas!.length > 0;

    //Popula a variavel usuario para exibir na ficha da vacina
    this.usuario = this.cartaoVacina.pessoa;
  }

  abrirModalEditar(modal: 'info' | 'add', vacina: Vacina) {
    this.vacinaSelecionada = vacina;
    this.store.set('vacinaSelecionada', this.vacinaSelecionada);
    this.tipoModal = modal;
  }

  abrirModalAdicionar(modal: 'info' | 'add') {
    this.tipoModal = modal;
  }

  fecharModal() {
    this.tipoModal = null;
    this.editandoVacina = false;
  }

  editarModal() {
    this.editandoVacina = true;
  }

  atualizarVacina(form: NgForm) {
    this.editandoVacina = false;
    this.tipoModal = null;
    this.loaderService.show();
    this.vacinaService.atualizarVacina(this.vacinaSelecionada?.id!, form.value, this.usuario?.cpf!).subscribe({
      next: (resp) => {
        this.cartaoVacina = resp;
        this.loaderService.hide();
      },
    });
  }

  excluirVacina() {
    this.tipoModal = null;
    this.loaderService.show();
    this.vacinaService.deletarVacina(this.vacinaSelecionada, this.usuario?.cpf!).subscribe({
      next: (resp) => {
        this.cartaoVacina = resp;
        this.loaderService.hide();
      },
    });
  }

  adicionarVacina(form: NgForm) {
    this.loaderService.show();
    this.tipoModal = null;
    this.vacinaService.adicionarVacina(form.value, this.usuario?.cpf!).subscribe({
      next: (resp) => {
        this.possuiVacina = true;
        this.cartaoVacina = resp;
        this.loaderService.hide();
      },
    });
  }
}
