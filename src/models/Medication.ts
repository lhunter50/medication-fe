// Defining the Medication type based on my data structure.
export interface Medication {
  id: number;
  name: string;
  classification: string;
  intention: string;
  implications: string;
  dose: string;
  route: string;
  frequency: string;
  [key:string]: any;
}   
