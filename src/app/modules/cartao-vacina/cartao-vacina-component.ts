import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vacina } from '../../shared/models/vacinaModel';
import { Pessoa } from '../../shared/models/pessoaModel';
import { CartaoVacinacaoResponse } from '../../shared/models/cartaoVacinaModel';
import { MOCK_CARTAO } from '../../mocks/cartaoVacinaResponseMock';
import { Store } from '../../shared/utils/util.store';

@Component({
  selector: 'app-cartao-vacina-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartao-vacina-component.html',
  styleUrl: './cartao-vacina-component.scss'
})
export class CartaoVacinaComponent implements OnInit {

  tipoModal: 'info' | 'add' | null = null;

  //Variavel usada ao clicar no botão 'editar'
  editandoVacina: boolean = false;

  cartaoVacina!: CartaoVacinacaoResponse;
  usuario: Pessoa | null = null;
  vacinas: Vacina[] = [];

  //Variavel usada para identificar se cliente possui ou nao vacinas
  possuiVacina: boolean = false;

  //Variavel para quando cliente clica em alguma vacina específica, seja para editar, excluir ou visualizar
  vacinaSelecionada: Vacina = {
    id: '',
    nome: '',
    data: '',
    dose: '1ª Dose',
    fabricante: ''
  };

  constructor(private store: Store){}

  ngOnInit(): void {
    //Variavel principal recebe valor da API que retorna informacoes do cliente
    this.cartaoVacina = MOCK_CARTAO;

    //Valida se cliente tem ou nao vacina registrada, para exibicao ou nao do disclaimer
    this.possuiVacina = this.cartaoVacina.vacinas.length > 0;

    //Popula a variavel usuario para exibir na ficha da vacina
    this.usuario = this.cartaoVacina.pessoa;
  }

  abrirModalEditar(modal: 'info' | 'add', vacina: Vacina) {
    this.vacinaSelecionada = vacina;
    this.store.set("vacinaSelecionada", this.vacinaSelecionada)
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

  salvarVacina() {
    this.editandoVacina = true;
    this.tipoModal = null;
  }

  excluirVacina(){

  }
}
