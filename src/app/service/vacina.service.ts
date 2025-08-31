import { Injectable } from '@angular/core';
import { delay, Observable, of, VirtualAction } from 'rxjs';
import { CartaoVacinacaoResponse } from '../shared/models/cartaoVacinaModel';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../shared/models/pessoaModel';
import { MOCK_CARTAO } from '../mocks/cartaoVacinaResponseMock';
import { MOCK_CARTAO_LOGIN } from '../mocks/loginResponse';
import { Vacina } from '../shared/models/vacinaModel';
import { MOCK_CARTAO_DELETAR } from '../mocks/mockDeletarVacina';
import { MOCK_CARTAO_ATUALIZAR } from '../mocks/mockAtualizarVacina';
import { MOCK_CARTAO_ADICIONAR } from '../mocks/mockAdicionarVacina';

@Injectable({
  providedIn: 'root',
})
export class VacinaService {
  constructor(private http: HttpClient) {}

  adicionarVacina(vacina: Vacina, cpf: string): Observable<CartaoVacinacaoResponse> {
    return of(MOCK_CARTAO_ADICIONAR as unknown as CartaoVacinacaoResponse).pipe(delay(500));
    let body = {
        nome: vacina.nome,           
        data: vacina.data,          
        dose: vacina.dose,
        fabricante: vacina.fabricante,
        cpf: cpf
    };
    const url = 'http://localhost:4000/vacina/adicionar';
    return this.http.post<CartaoVacinacaoResponse>(url, body);
  }

  atualizarVacina(idVacina: string, vacina: Vacina, cpf: string): Observable<CartaoVacinacaoResponse> {
    return of(MOCK_CARTAO_ATUALIZAR as unknown as CartaoVacinacaoResponse).pipe(delay(500));

    let body = {
        id: idVacina,                 
        nome: vacina.nome,           
        data: vacina.data,          
        dose: vacina.dose,
        fabricante: vacina.fabricante,
        cpf: cpf
    };
    const url = 'http://localhost:4000/vacina/atualizar';
    return this.http.post<CartaoVacinacaoResponse>(url, body);
  }

  deletarVacina(vacina: Vacina, cpf: string): Observable<CartaoVacinacaoResponse> {
    return of(MOCK_CARTAO_DELETAR as unknown as CartaoVacinacaoResponse).pipe(delay(500));

    let body = {
      cpf: cpf,
      id: vacina.id
    };
    const url = 'http://localhost:4000/vacina/deletar';
    return this.http.post<CartaoVacinacaoResponse>(url, body);
  }
}
