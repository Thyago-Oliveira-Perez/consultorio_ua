import { Convenio } from "@/model/convenio.model";
import { PageRequest } from "@/model/page/page-request";
import { CommonClient } from "./common.client";

export class ConvenioClient extends CommonClient{

  constructor(){
    super();
    this.url = "http://localhost:8080/api/convenios";
  }

  public async findById(id: number){
    return this._findById<Convenio>(id);
  }

  public async findByName(pageRequest: PageRequest, name: string){
    return this._findByName<Convenio>(pageRequest, name);
  }

  public async findAll(pageRequest: PageRequest){
    return this._findAll<Convenio>(pageRequest);
  }

  public async register(model: Convenio){
    return this._register<Convenio>(model);
  }

  public async edit(id: number, model: Convenio){
    return this._edit<Convenio>(id, model);
  }

  public async updateStatus(id: number){
    return this._updateStatus(id);
  }
}