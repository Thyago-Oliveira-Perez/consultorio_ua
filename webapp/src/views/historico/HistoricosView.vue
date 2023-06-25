<template>
  <div class="column is-12">
    <h1>Historicos</h1>
  </div>
  <div class="column is-12">
    <table class="table table-css">
      <thead>
        <tr>
          <th>Data</th>
          <th>Paciente</th>
          <th>Secretaria</th>
          <th>Observações</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in historicoList" :key="info.id">
          <td>{{ info.data.getDate }}</td>
          <td>{{ info.paciente }}</td>
          <td>{{ info.secretaria }}</td>
          <td>{{ info.observacao }}</td>
          <td>{{ info.statusAgenda }}</td>
          <td>
            <button id="button-status">Desativar</button>
            <button id="button-edit">
              <router-link to="/" style="text-decoration: none; color: black"
                >Editar</router-link
              >
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <nav
      class="pagination is-centered"
      role="navigation"
      aria-label="pagination"
      style="background-color: #ffff; border-radius: 5px; padding: 20px"
    >
      <a
        class="pagination-previous"
        @click="toListHistoricos(pageRequest.currentPage - 1)"
        >Anterior</a
      >
      <a
        class="pagination-next"
        @click="toListHistoricos(pageRequest.currentPage + 1)"
        >Próxima</a
      >
    </nav>
  </div>
</template>

<style>
#button-cadastrar {
  height: 40px;
  border-radius: 5px;
  background-color: #42b983;
}
</style>

<script lang="ts">
import { Vue } from "vue-class-component";

import { Historico } from "../../model/historico.model";
import { HistoricoClient } from "@/client/historico.client";

import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class HistoricosView extends Vue {
  public historicoList: Historico[] = [];
  private historicoClient!: HistoricoClient;

  public pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Historico> = new PageResponse();

  public mounted(): void {
    this.historicoClient = new HistoricoClient();
    this.toListHistoricos(0);
  }

  public toListHistoricos(page: number): void {
    this.pageRequest.currentPage = page;
    this.historicoClient.findAll(this.pageRequest).then(
      (sucess) => {
        this.pageResponse = sucess;
        this.historicoList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }
}
</script>
