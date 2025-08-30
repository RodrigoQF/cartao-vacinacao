import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vacina } from '../../shared/models/vacinaModel';
import { Pessoa } from '../../shared/models/pessoaModel';
import { CartaoVacinacaoResponse } from '../../shared/models/cartaoVacinaModel';
import { MOCK_CARTAO } from '../../mocks/cartaoVacinaResponseMock';

@Component({
  selector: 'app-cartao-vacina-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cartao-vacina-component.html',
  styleUrl: './cartao-vacina-component.scss'
})
export class CartaoVacinaComponent implements OnInit {
  tipoModal: 'info' | 'add' | null = null;
  editandoVacina: boolean = false;
  cartaoVacina!: CartaoVacinacaoResponse;
  usuario: Pessoa | null = null;
  vacinas: Vacina[] = [];
  possuiVacina: boolean = false;
  vacinaSelecionada: Vacina = {
    id: '',
    nome: '',
    data: '',
    dose: '1ª Dose',
    fabricante: ''
  };
  ngOnInit(): void {
    this.cartaoVacina = MOCK_CARTAO;
    this.possuiVacina = this.cartaoVacina.vacinas.length > 0;
    this.usuario = this.cartaoVacina.pessoa;
  }

  abrirModalEditar(modal: 'info' | 'add', vacina: Vacina) {
    this.vacinaSelecionada = vacina;
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
