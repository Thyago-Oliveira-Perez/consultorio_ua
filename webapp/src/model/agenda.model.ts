import { StatusAgenda } from "@/enums/status_agenda";
import { AbstractClass } from "./abstract-class.model";
import { Medico } from "./medico.model";
import { Paciente } from "./paciente.model";

export class Agenda extends AbstractClass{

  status! : StatusAgenda;
  observacao! : string;
  dataDe! : Date;
  dataAte! : Date;
  encaixe! : boolean;
  paciente! : Paciente;
  medico! : Medico;

}