import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Vacina } from "../models/vacinaModel";
import { Pessoa } from "../models/pessoaModel";
import { ParseSourceFile } from "@angular/compiler";
import { CartaoVacinacaoResponse } from "../models/cartaoVacinaModel";
import { CartaoVacinaComponent } from "../../modules/cartao-vacina/cartao-vacina-component";


export interface State {
    vacinaSelecionada: Vacina,
    erroAplicacao: boolean,
    clienteCadastro: Pessoa,
    vacinaResponse: CartaoVacinacaoResponse


}
const dadosCliente: State = {
    vacinaSelecionada: new Vacina(),
    erroAplicacao: false,
    clienteCadastro: new Pessoa(),
    vacinaResponse: new CartaoVacinacaoResponse()
}

@Injectable({
    providedIn: 'root',
})
export class Store {
    private subject = new BehaviorSubject<State>(dadosCliente);

    get value() {
        return this.subject.value;
    }

    set(name: string, state: any) {
        this.subject.next({
            ...this.value,
            [name]: state,
        })
    }

}