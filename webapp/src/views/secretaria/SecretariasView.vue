<template>
  <div class="column is-12">
    <h1>Lista de Secretarias</h1>
  </div>
  <div class="column is-12" style="display: flex; align-items: center">
    <input class="input" type="text" v-model="name" placeholder="Procurar" />
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
          <th>Pis</th>
          <th>Data de Contratação</th>
          <th>Opções</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="info in secretariaList" :key="info.id">
          <td>{{ info.nome }}</td>
          <td>{{ info.pis }}</td>
          <td>{{ new Date(info.dataContratacao) }}</td>
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
  </div>
  <nav
    class="pagination is-centered"
    role="navigation"
    aria-label="pagination"
    style="background-color: #ffff; border-radius: 5px; padding: 20px"
  >
    <a
      class="pagination-previous"
      @click="toListSecretarias(pageRequest.currentPage - 1)"
      >Anterior</a
    >
    <a
      class="pagination-next"
      @click="toListSecretarias(pageRequest.currentPage + 1)"
      >Próxima</a
    >
  </nav>
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

import { Secretaria } from "@/model/secretaria.model";
import { SecretariaClient } from "@/client/secretaria.client";

import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";

export default class SecretariasView extends Vue {
  public pageRequest: PageRequest = new PageRequest();
  private pageResponse: PageResponse<Secretaria> = new PageResponse();

  private secretariaClient!: SecretariaClient;
  public secretariaList: Secretaria[] = [];

  public name = "";

  public mounted(): void {
    this.secretariaClient = new SecretariaClient();
    this.toListSecretarias(0);
  }

  public toListSecretarias(page: number): void {
    this.pageRequest.currentPage = page;
    this.secretariaClient.findAll(this.pageRequest).then(
      (sucesss) => {
        this.pageResponse = sucesss;
        this.secretariaList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }

  public onClickCadastrar(): void {
    this.$router.push({ name: "cadastroSecretaria" });
  }

  public onSearch(name: string): void {
    if (name.length != 0) {
      this.secretariaClient
        .findByName(this.pageRequest, name)
        .then((success) => {
          this.pageResponse = success;
          this.secretariaList = this.pageResponse.content;
          this.$router.push({ name: "secretarias" });
        });
    } else if (name.length == 0) {
      this.toListSecretarias(0);
    }
  }

  public edit(id: number): void {
    this.$router.push({
      name: "cadastroSecretaria",
      params: { id: id },
    });
  }

  public disable(id: number): void {
    this.secretariaClient.updateStatus(id).then(
      (success) => {
        console.log(success);
        this.toListSecretarias(0);
      },
      (error) => console.log(error)
    );
  }

  public details(id: number): void {
    this.$router.push({
      name: "detalhesSecretaria",
      params: { id: id },
    });
  }
}
</script>
