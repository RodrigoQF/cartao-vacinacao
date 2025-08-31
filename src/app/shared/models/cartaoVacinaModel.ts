import { Pessoa } from "./pessoaModel";
import { Vacina } from "./vacinaModel";

export class CartaoVacinacaoResponse {
  pessoa?: Pessoa;
  vacinas?: Vacina[];
}