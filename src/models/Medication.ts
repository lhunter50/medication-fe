// Defining the Medication type based on my data structure. Also so we don't use redundent code we just import this when we need it.
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
