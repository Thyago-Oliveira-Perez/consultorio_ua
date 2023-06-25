import { TipoAtendimento } from "@/enums/tipo_atendimento";
import { Convenio } from "./convenio.model";
import { Pessoa } from "./pessoa.model";

export class Paciente extends Pessoa{

  tipoAtendimento! : TipoAtendimento;
  numeroCartao! : string;
  dataVencimento! : Date;
  convenio! : Convenio; 

}