import { Sexo } from "@/enums/sexo";
import { AbstractClass } from "./abstract-class.model";

export class Pessoa extends AbstractClass{

  nome! : string;
  telefone! : string;
  celular! : string;
  nacionalidade! : string;
  cpf! : string;
  rg! : string;
  email! : string;
  login! : string;
  senha! : string;
  sexo! : Sexo;

}