import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import axios, { AxiosInstance } from "axios";

export class CommonClient {
  
  url = "";

  axiosClient: AxiosInstance = axios.create({
    baseURL: this.url,
    headers: { "Content-type": "application/json" },
  });

  private handleError(error: any){
    return Promise.reject(error.response)
  }

  protected async _findById<T>(id: number): Promise<T> {
    try {
      return (await this.axiosClient.get(`${this.url}/${id}`)).data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  protected async _findByName<T>(pageRequest: PageRequest, name: string): Promise<PageResponse<T>>{
    try{
      return (await this.axiosClient.get(`${this.url}/search/${name}`)).data
    }catch(error: any){
      return this.handleError(error);
    }
  }

  protected async _findAll<T>(pageRequest: PageRequest): Promise<PageResponse<T>> {
    try {
      let requestPath = this.url;

      requestPath += `?page=${pageRequest.currentPage}`;
      requestPath += `&size=${pageRequest.pageSize}`;
      requestPath += `&sort=${
        pageRequest.sortField === undefined ? "" : pageRequest.sortField
      },${pageRequest.direction}`;

      return (
        await this.axiosClient.get(requestPath, {
          params: { filtros: pageRequest.filter },
        })
      ).data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  protected async _register<T>(model: T): Promise<T> {
    try {
      return await this.axiosClient.post(`${this.url}/`, model);
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  protected async _edit<T>(id: number, model: T): Promise<T> {
    try {
      return (await this.axiosClient.put(`${this.url}/update/${id}`, model)).data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }

  protected async _updateStatus<T>(id: number): Promise<T> {
    try {
      return (await this.axiosClient.put(`${this.url}/status/${id}`)).data;
    } catch (error: any) {
      return this.handleError(error);
    }
  }
}
