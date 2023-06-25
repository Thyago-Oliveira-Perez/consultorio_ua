<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Cadastro de Convênio</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Nome do convênio</label>
        <input
          class="input"
          v-model="convenio.nome"
          type="text"
          placeholder="Nome"
        />
      </div>
      <div id="input-field">
        <label>Valor</label>
        <input
          class="input"
          v-model="convenio.valor"
          type="text"
          placeholder="R$ 00,00"
        />
      </div>
    </div>
  </div>
  <button class="button is-link" style="background-color: #42b983">
    <router-link to="/convenios">Voltar</router-link>
  </button>
  <button
    v-if="convenio.id"
    class="button is-link button"
    style="background-color: #42b983"
    @click="registerConvenio"
  >
    Atualizar
  </button>
  <button
    v-if="!convenio.id"
    class="button is-link button"
    style="background-color: #42b983"
    @click="registerConvenio"
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

import { Convenio } from "@/model/convenio.model";
import { ConvenioClient } from "@/client/convenio.client";
import { Prop } from "vue-property-decorator";

export default class CadastroConvenio extends Vue {
  private convenioClient!: ConvenioClient;
  public convenio = new Convenio();

  public mounted(): void {
    this.convenioClient = new ConvenioClient();
    if (this.id != null) {
      this.getById(this.id);
    }
  }

  @Prop({ type: String, require: true })
  private readonly id!: number;

  private getById(id: number): void {
    this.convenioClient.findById(id).then((success) => {
      this.convenio = success;
    });
  }

  public registerConvenio(): void {
    if (this.convenio.id != null) {
      this.convenioClient.edit(this.convenio.id, this.convenio).then(
        (sucess) => {
          this.onClickClear();
        },
        (error) => console.log(error)
      );
    } else {
      if (this.convenio.ativo === undefined) {
        this.convenio.ativo = false;
      }

      this.convenioClient.register(this.convenio).then(
        (sucess) => {
          this.onClickClear();
        },
        (error) => console.log(error)
      );
    }
  }

  private onClickClear(): void {
    this.convenio = new Convenio();
    this.$router.push({ name: "convenios" });
  }
}
</script>
