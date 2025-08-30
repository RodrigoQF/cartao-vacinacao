export type Dose =
  | '1ª Dose'
  | '2ª Dose'
  | '3ª Dose'
  | 'Reforço'
  | 'Dose Única';

export interface Vacina {
  id: string;                 
  nome: string;            
  data: string;          
  dose: Dose;
  fabricante: string;
}