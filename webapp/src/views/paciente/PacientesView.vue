<template>
  <div class="column is-12">
    <h1>Lista de Pacientes</h1>
  </div>
  <div class="column is-12" style="display: flex; align-items: center">
    <input class="input" v-model="name" type="text" placeholder="Procurar" />
    <button
      class="button is-link button"
      id="button-cadastrar"
      @click="onSearch(name)"
    >
      Procurar
    </button>
    <button class="button is-link button" id="button-cadastrar">
      <router-link to="/cadastrarPaciente" style="text-decoration: none"
        >Cadastrar</router-link
      >
    </button>
  </div>
  <div class="column is-12">
    <table class="table table-css">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Nacionalidade</th>
          <th>Telefone</th>
          <th>Tipo de Atendimento</th>
          <th>Convenio</th>
          <th>Data Vencimento</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in pacienteList" :key="info.id">
          <td>{{ info.nome }}</td>
          <td>{{ info.nacionalidade }}</td>
          <td>{{ info.telefone }}</td>
          <td>{{ info.tipoAtendimento }}</td>
          <td v-if="!info.convenio">Não vinculado</td>
          <td v-if="info.convenio">{{ info.convenio.nome }}</td>
          <td>{{ info.dataVencimento }}</td>
          <td
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              flex-wrap: wrap;
            "
          >
          <button
            v-if="info.ativo"
            @click="disable(info.id)"
            style="text-decoration: none"
            class="is-link button"
            id="button-status"
          >
            Desativar
          </button>
          <button
            v-if="!info.ativo"
            @click="disable(info.id)"
            style="text-decoration: none"
            class="is-link button"
            id="button-habilitar"
          >
            Habilitar
          </button>
          <button
            class="is-link button"
            id="button-edit"
            @click="edit(info.id)"
          >
            Editar
          </button>
            <button class="is-link button" @click="details(info.id)">
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
        @click="toListPacientes(pageRequest.currentPage - 1)"
        >Anterior</a
      >
      <a
        class="pagination-next"
        @click="toListPacientes(pageRequest.currentPage + 1)"
        >Próxima</a
      >
    </nav>
  </div>
</template>

<style>
th {
  min-width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
}

td {
  min-width: 10%;
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

#button-habilitar {
  background-color: #42b983;
}

#button-edit {
  background-color: #9400d3;
}

.table-css {
  width: 100%;
  border-radius: 5px;
}
</style>

<script lang="ts">
import { Vue } from "vue-class-component";

import { Paciente } from "@/model/paciente.model";
import { PacienteClient } from "@/client/paciente.client";

import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class PacientesView extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Paciente> = new PageResponse();

  private pacienteClient!: PacienteClient;
  public pacienteList: Paciente[] = [];

  public name = "";

  public mounted(): void {
    this.pacienteClient = new PacienteClient();
    this.toListPacientes(0);
  }

  public toListPacientes(page: number): void {
    this.pageRequest.currentPage = page;
    this.pacienteClient.findAll(this.pageRequest).then(
      (sucess) => {
        this.pageResponse = sucess;
        this.pacienteList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public edit(id: number): void {
    this.$router.push({
      name: "cadastroPaciente",
      params: { id: id },
    });
  }

  public details(id: number): void {
    this.$router.push({
      name: "detalhesPaciente",
      params: { id: id },
    });
  }

  public onSearch(name: string): void {
    if (name.length != 0) {
      this.pacienteClient.findByName(this.pageRequest, name).then((success) => {
        this.pageResponse = success;
        this.pacienteList = this.pageResponse.content;
        this.$router.push({ name: "pacientes" });
      });
    } else if (name.length == 0) {
      this.toListPacientes(0);
    }
  }

    public disable(id: number): void {
    this.pacienteClient.updateStatus(id).then(
      (success) => {
        console.log(success);
        this.toListPacientes(0);
      },
      (error) => console.log(error)
    );
  }
}
</script>
