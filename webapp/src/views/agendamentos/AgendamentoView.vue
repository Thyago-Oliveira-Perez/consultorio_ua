<template>
  <div class="column is-12">
    <h1>Lista de Agendamentos</h1>
  </div>
  <div class="column is-12" style="display: flex; align-items: center">
    <input class="input" type="text" placeholder="Procurar" />
    <button class="button is-link" id="button-cadastrar">
      <router-link to="/cadastrarAgendamento" style="text-decoration: none"
        >Adicionar</router-link
      >
    </button>
  </div>
  <div class="column is-12">
    <table class="table table-css">
      <thead>
        <tr>
          <th>Status</th>
          <th>Paciente</th>
          <th>Data</th>
          <th>Encaixe</th>
          <th>Médico</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in agendaList" :key="info.id">
          <td>{{ info.status }}</td>
          <td>{{ info.paciente.nome }}</td>
          <td>{{ info.dataDe }}</td>
          <td v-if="info.encaixe">SIM</td>
          <td v-if="!info.encaixe">NÃO</td>
          <td>{{ info.medico.nome }}</td>
          <td
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;
            "
          >
            <button class="is-link button" id="button-status">Desativar</button>
            <button class="is-link button" id="button-edit">
              <router-link to="/" style="text-decoration: none; color: black"
                >Editar</router-link
              >
            </button>
            <button
              class="is-link button"
              d="button-status"
              @click="details(info.id)"
            >
              Detalhes
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
        @click="toListAgenda(pageRequest.currentPage - 1)"
        >Anterior</a
      >
      <a
        class="pagination-next"
        @click="toListAgenda(pageRequest.currentPage + 1)"
        >Próxima</a
      >
    </nav>
  </div>
</template>

<style>
th {
  max-width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

td {
  max-width: 10%;
  min-height: 70px;
}
tr {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

button {
  border-radius: 5px;
}

#button-status {
  background-color: red;
}

#button-edit {
  background-color: #42b983;
}

.table-css {
  width: 100%;
  border-radius: 5px;
}

#button-cadastrar {
  height: 40px;
  border-radius: 5px;
  background-color: #42b983;
}
</style>

<script lang="ts">
import { Vue } from "vue-class-component";

import { Agenda } from "@/model/agenda.model";
import { AgendaClient } from "@/client/agenda.client";

import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class AgendamentoView extends Vue {
  public agendaList: Agenda[] = [];
  private agendaClient!: AgendaClient;

  public pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Agenda> = new PageResponse();

  public mounted(): void {
    this.agendaClient = new AgendaClient();
    this.toListAgenda(0);
  }

  public toListAgenda(page: number): void {
    this.pageRequest.currentPage = page;
    this.agendaClient.findAll(this.pageRequest).then(
      (sucess) => {
        this.pageResponse = sucess;
        this.agendaList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public details(id: number): void {
    this.$router.push({
      name: "detalhesAgendamento",
      params: { id: id },
    });
  }
}
</script>
