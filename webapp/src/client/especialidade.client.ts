import { Especialidade } from "@/model/especialidade.model";
import { PageRequest } from "@/model/page/page-request";
import { CommonClient } from "./common.client";

export class EspecialidadeClient extends CommonClient{

  constructor(){
    super();
    this.url = "http://localhost:8080/api/especialidades";
  }

  public async findById(id: number){
    return this._findById<Especialidade>(id);
  }

  public async findByName(pageRequest: PageRequest, name: string) {
    return this._findByName<Especialidade>(pageRequest, name);
  }

  public async findAll(pageRequest: PageRequest){
    return this._findAll<Especialidade>(pageRequest);
  }

  public async register(model: Especialidade){
    return this._register<Especialidade>(model);
  }

  public async edit(id: number, model: Especialidade){
    return this._edit<Especialidade>(id, model);
  }

  public async updateStatus(id: number){
    return this._updateStatus(id);
  }
}
