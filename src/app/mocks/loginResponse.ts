import { CartaoVacinacaoResponse } from "../shared/models/cartaoVacinaModel";

export const MOCK_CARTAO_LOGIN: CartaoVacinacaoResponse = {
  pessoa: {
    id: '001',
    cpf: '12345678900',
    nome: 'Rodrigo Francischi',
    idade: 23,
    sexo: 'Masculino'
  },
  vacinas: [
  ]
};