import { Pessoa } from "./pessoaModel";
import { Vacina } from "./vacinaModel";

export interface CartaoVacinacaoResponse {
  pessoa: Pessoa;
  vacinas: Vacina[];
}