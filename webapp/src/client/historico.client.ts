import { Historico } from "@/model/historico.model";
import { PageRequest } from "@/model/page/page-request";
import { CommonClient } from "./common.client";

export class HistoricoClient extends CommonClient{

  constructor(){
    super();
    this.url = "http://localhost:8080/api/historicos";
  }

  public async findById(id: number){
    return this._findById<Historico>(id);
  }

  public async findAll(pageRequest: PageRequest){
    return this._findAll<Historico>(pageRequest);
  }

  public async register(model: Historico){
    return this._register<Historico>(model);
  }

  public async edit(id: number, model: Historico){
    return this._edit<Historico>(id, model);
  }

  public async updateStatus(id: number){
    return this._updateStatus(id);
  }
}