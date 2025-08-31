import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Vacina } from "../models/vacinaModel";


export interface State {
    vacinaSelecionada: Vacina

}
const dadosCliente: State = {
    vacinaSelecionada: new Vacina()
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