<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Cadastro de Especialidades</h1>
    <div id="cadastro">
      <div id="input-field">
        <label class="checkbox">
          <input v-model="especialidade.ativo" type="checkbox" />
          Ativa</label
        >
      </div>
      <div id="input-field">
        <label>Nome da especialidade</label>
        <input
          class="input"
          v-model="especialidade.nome"
          type="text"
          placeholder="Nome"
        />
      </div>
    </div>
  </div>
  <button class="button is-link" style="background-color: #42b983">
    <router-link to="/especialidades">Voltar</router-link>
  </button>
  <button
    v-if="especialidade.id"
    class="button is-link button"
    style="background-color: #42b983"
    @click="registerEspecialidade"
  >
    Atualizar
  </button>
  <button
    v-if="!especialidade.id"
    class="button is-link button"
    style="background-color: #42b983"
    @click="registerEspecialidade"
  >
    Cadastrar
  </button>
</template>

<style>
#container {
  margin: 5px 0;
}

#cadastro {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  max-width: 100%;
  margin: 10px 0;
}

#input-field {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 30%;
  margin: 6px 0;
}

.select-option {
  width: 100%;
}

select {
  width: 100%;
}

label,
h1 {
  color: #ffff;
}

a {
  text-decoration: none;
  color: #ffff;
}
</style>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

import { EspecialidadeClient } from "@/client/especialidade.client";
import { Especialidade } from "@/model/especialidade.model";

export default class CadastroEspecialidade extends Vue {
  private especialidadeClient!: EspecialidadeClient;
  public especialidade = new Especialidade();

  public mounted(): void {
    this.especialidadeClient = new EspecialidadeClient();
    if (this.id) {
      this.getById(this.id);
    }
  }

  public registerEspecialidade(): void {
    if (this.especialidade.id != null) {
      this.especialidadeClient
        .edit(this.especialidade.id, this.especialidade)
        .then(
          (sucess) => {
            this.onClickClear();
          },
          (error) => console.log(error)
        );
    } else {
      if (this.especialidade.ativo === undefined) {
        this.especialidade.ativo = false;
      }

      this.especialidadeClient.register(this.especialidade).then(
        (sucess) => {
          this.onClickClear();
        },
        (error) => console.log(error)
      );
    }
  }

  @Prop({ type: String, require: true })
  private readonly id!: number;

  private getById(id: number): void {
    this.especialidadeClient.findById(id).then((success) => {
      this.especialidade = success;
    });
  }

  private onClickClear(): void {
    this.especialidade = new Especialidade();
    this.$router.push({ name: "especialidades" });
  }
}
</script>
