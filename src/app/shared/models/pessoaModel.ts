export interface Pessoa {
  id: string;               
  cpf: string;  
  nome: string;
  idade: number;
  sexo: 'Masculino' | 'Feminino' | 'Outro';
}