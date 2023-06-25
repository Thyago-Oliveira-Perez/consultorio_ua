<template>
  <div class="column is-12">
    <h1>Especialidades</h1>
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
    <button
      class="button is-link button"
      id="button-cadastrar"
      @click="onClickCadastrar()"
    >
      Cadastrar
    </button>
  </div>
  <div class="column is-12">
    <table class="table table-css">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Ativo</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in especialidadeList" :key="info.id">
          <td>{{ info.nome }}</td>
          <td v-if="info.ativo">Habilitado</td>
          <td v-if="!info.ativo">Desabilitado</td>
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
              @click="edit(info.id)"
              style="text-decoration: none"
              class="is-link button"
              id="button-edit"
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
        @click="toListEspecialidades(pageRequest.currentPage - 1)"
        >Anterior</a
      >
      <a
        class="pagination-next"
        @click="toListEspecialidades(pageRequest.currentPage + 1)"
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
  margin: 6px;
  width: auto;
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

#button-cadastrar {
  height: 40px;
  border-radius: 5px;
  background-color: #42b983;
}
</style>

<script lang="ts">
import { Vue } from "vue-class-component";

import { EspecialidadeClient } from "@/client/especialidade.client";
import { Especialidade } from "@/model/especialidade.model";

import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class EspecialidadeView extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Especialidade> = new PageResponse();

  private especialidadeClient!: EspecialidadeClient;
  public especialidadeList: Especialidade[] = [];

  public name = "";

  public mounted(): void {
    this.especialidadeClient = new EspecialidadeClient();
    this.toListEspecialidades(0);
  }

  public toListEspecialidades(page: number): void {
    this.pageRequest.currentPage = page;
    this.especialidadeClient.findAll(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.especialidadeList = this.pageResponse.content;
        console.log(this.pageResponse.content);
      },
      (error) => console.log(error)
    );
  }

  public edit(id: number): void {
    this.$router.push({
      name: "cadastroEspecialidade",
      params: { id: id },
    });
  }

  public disable(id: number): void {
    this.especialidadeClient.updateStatus(id).then(
      (success) => {
        console.log(success);
        this.toListEspecialidades(0);
      },
      (error) => console.log(error)
    );
  }

  public onClickCadastrar(): void {
    this.$router.push({ name: "cadastroEspecialidade" });
  }

  public onSearch(name: string): void {
    if (name.length != 0) {
      this.especialidadeClient
        .findByName(this.pageRequest, name)
        .then((success) => {
          this.pageResponse = success;
          console.log(this.pageResponse.content);
          this.especialidadeList = this.pageResponse.content;
          this.$router.push({ name: "especialidades" });
        });
    } else if (name.length == 0) {
      this.toListEspecialidades(0);
    }
  }

  public details(id: number): void {
    this.$router.push({
      name: "detalhesEspecialidades",
      params: { id: id },
    });
  }
}
</script>
