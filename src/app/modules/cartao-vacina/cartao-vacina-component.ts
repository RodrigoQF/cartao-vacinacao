import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartao-vacina-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartao-vacina-component.html',
  styleUrl: './cartao-vacina-component.scss'
})
export class CartaoVacinaComponent implements OnInit {
  tipoModal: 'info' | 'add' | null = null;


  ngOnInit(): void {
    
  }

  abrirModal(modal: 'info' | 'add'){
    this.tipoModal = modal;
  }

  fecharModal(){
      this.tipoModal = null;
  }

}
