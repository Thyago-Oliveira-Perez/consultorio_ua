import { StatusAgenda } from "@/enums/status_agenda";
import { AbstractClass } from "./abstract-class.model";
import { Agenda } from "./agenda.model";
import { Paciente } from "./paciente.model";
import { Secretaria } from "./secretaria.model";

export class Historico extends AbstractClass{
  
  data! : Date;
  statusAgenda! : StatusAgenda;
  observacao! : string;
  secretaria! : Secretaria;
  paciente! : Paciente;
  agenda! : Agenda;

}