import { CartaoVacinacaoResponse } from '../shared/models/cartaoVacinaModel';

export const MOCK_CARTAO_DELETAR: CartaoVacinacaoResponse = {
  pessoa: {
    id: '001',
    cpf: '12345678900',
    nome: 'Rodrigo Francischi',
    idade: 23,
    sexo: 'Masculino',
  },
  vacinas: [
    {
      id: 'v1',
      nome: 'Febre Amarela',
      data: '2025-01-10',
      dose: '1ª Dose',
      fabricante: 'AstraZeneca',
    },
  ],
};
