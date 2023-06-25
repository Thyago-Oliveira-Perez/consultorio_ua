import { Paciente } from "@/model/paciente.model";
import { PageRequest } from "@/model/page/page-request";
import { CommonClient } from "./common.client";

export class PacienteClient extends CommonClient{

  constructor(){
    super();
    this.url = "http://localhost:8080/api/pacientes";
  }

  public async findById(id: number){
    return this._findById<Paciente>(id);
  }

  public async findByName(pageRequest: PageRequest, name: string){
    return this._findByName<Paciente>(pageRequest, name);
  }

  public async findAll(pageRequest: PageRequest){
    return this._findAll<Paciente>(pageRequest);
  }

  public async register(model: Paciente){
    return this._register<Paciente>(model);
  }

  public async edit(id: number, model: Paciente){
    return this._edit<Paciente>(id, model);
  }

  public async updateStatus(id: number){
    return this._updateStatus(id);
  }
}