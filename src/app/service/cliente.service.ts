import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable, of } from "rxjs";
import { CartaoVacinacaoResponse } from "../shared/models/cartaoVacinaModel";
import { HttpClient } from "@angular/common/http";
import { Pessoa } from "../shared/models/pessoaModel";
import { MOCK_CARTAO } from "../mocks/cartaoVacinaResponseMock";
import { MOCK_CARTAO_LOGIN } from "../mocks/loginResponse";

@Injectable({
    providedIn: 'root',
})
export class ClienteService {
    constructor(private http: HttpClient) { }

    cadastroCliente(pessoaModel: Pessoa): Observable<CartaoVacinacaoResponse> {

        return of(MOCK_CARTAO_LOGIN as unknown as CartaoVacinacaoResponse).pipe(delay(500));
        let body = {
            cpf: pessoaModel.cpf,
            idade: pessoaModel.idade,
            sexo: pessoaModel.sexo,
            nome: pessoaModel.nome
        }
        const url = "http://localhost:4000/cadastrar"
        return this.http.post<CartaoVacinacaoResponse>(url, body);
    }

    loginCliente(cpf: string): Observable<CartaoVacinacaoResponse> {

        return of(MOCK_CARTAO as unknown as CartaoVacinacaoResponse).pipe(delay(500));

        let body = {
            cpf: cpf,
        }
        const url = "http://localhost:4000/login"
        return this.http.post<CartaoVacinacaoResponse>(url, body);
    }


}
