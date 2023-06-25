import { PageRequest } from "@/model/page/page-request";
import { Secretaria } from "@/model/secretaria.model";
import { CommonClient } from "./common.client";

export class SecretariaClient extends CommonClient{

  constructor(){
    super();
    this.url = "http://localhost:8080/api/secretarias";
  }

  public async findById(id: number){
    return this._findById<Secretaria>(id);
  }

  public async findByName(pageRequest: PageRequest, name: string){
    return this._findByName<Secretaria>(pageRequest, name);
  }

  public async findAll(pageRequest: PageRequest){
    return this._findAll<Secretaria>(pageRequest);
  }

  public async register(model: Secretaria){
    return this._register<Secretaria>(model);
  }

  public async edit(id: number, model: Secretaria){
    return this._edit<Secretaria>(id, model);
  }

  public async updateStatus(id: number){
    return this._updateStatus(id);
  }
}