import { Agenda } from "@/model/agenda.model";
import { PageRequest } from "@/model/page/page-request";
import { CommonClient } from "./common.client";

export class AgendaClient extends CommonClient{

  constructor(){
    super();
    this.url = "http://localhost:8080/api/agendas";
  }

  public async findById(id: number){
    return this._findById<Agenda>(id);
  }

  public async findByName(pageRequest: PageRequest, name: string){
    return this._findByName<Agenda>(pageRequest, name);
  }

  public async findAll(pageRequest: PageRequest){
    return this._findAll<Agenda>(pageRequest);
  }

  public async register(model: Agenda){
    return this._register<Agenda>(model);
  }

  public async edit(id: number, model: Agenda){
    return this._edit<Agenda>(id, model);
  }

  public async updateStatus(id: number){
    return this._updateStatus(id);
  }
}