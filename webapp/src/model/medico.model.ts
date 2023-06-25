import { Especialidade } from "./especialidade.model";
import { Pessoa } from "./pessoa.model";

export class Medico extends Pessoa{

  crm! : string;
  consultorio! : string;
  porcentParticipacao! : number;
  valorConsulta! : number;
  especialidade! : Especialidade

}