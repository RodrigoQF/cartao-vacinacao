import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '../../utils/util.store';

@Component({
  selector: 'app-erros-component',
  imports: [],
  templateUrl: './erros-component.html',
  styleUrl: './erros-component.scss'
})
export class ErrosComponent implements OnInit {

  constructor(private router: Router, private store: Store){}
  message = 'Ops, sua requisição deu errado'
  ngOnInit(): void {
    if(this.store.value.erroAplicacao){
      this.message = "Ops, tivemos um problema por aqui"
    }
    
  }

  voltarInicio(){
    this.router.navigate(['login'])
  }

}
