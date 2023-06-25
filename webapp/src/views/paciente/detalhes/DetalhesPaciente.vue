<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Detalhes Pessoais</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Nome</label>
        <p>{{ paciente.nome }}</p>
      </div>
      <div id="input-field">
        <label>CPF</label>
        <p>{{ paciente.cpf }}</p>
      </div>
      <div id="input-field">
        <label>RG</label>
        <p>{{ paciente.rg }}</p>
      </div>
      <div id="input-field">
        <label>Telefone</label>
        <p>{{ paciente.telefone }}</p>
      </div>
      <div id="input-field">
        <label>Celular</label>
        <p>{{ paciente.celular }}</p>
      </div>
      <div id="input-field">
        <label>Nacionalidade</label>
        <p>{{ paciente.nacionalidade }}</p>
      </div>
      <div id="input-field">
        <label>Email</label>
        <p>{{ paciente.email }}</p>
      </div>
      <div id="input-field">
        <label>Login</label>
        <p>{{ paciente.login }}</p>
      </div>
      <div id="input-field">
        <label>Senha</label>
        <p>**********</p>
      </div>
      <div id="input-field">
        <label>Sexo</label>
        <p>{{ paciente.sexo }}</p>
      </div>
    </div>
  </div>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Detalhes Administrativos</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Tipo de Atendimento</label>
        <p>{{ paciente.tipoAtendimento }}</p>
      </div>
      <div id="input-field">
        <label>Número do Cartão</label>
        <p>{{ paciente.numeroCartao }}</p>
      </div>
      <div id="input-field">
        <label>Data de Vencimento do Convênio</label>
        <p>{{ paciente.dataVencimento }}</p>
      </div>
      <div id="input-field">
        <label>Nome do convênio</label>
        <p v-if="paciente.convenio">{{ paciente.convenio.nome }}</p>
      </div>
    </div>
  </div>
  <button class="button is-link" style="background-color: #42b983">
    <router-link to="/pacientes">Voltar</router-link>
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

import { PacienteClient } from "@/client/paciente.client";
import { Paciente } from "@/model/paciente.model";

export default class DetalhesPaciente extends Vue {
  private pacienteClient!: PacienteClient;
  public paciente = new Paciente();

  public mounted(): void {
    this.pacienteClient = new PacienteClient();
    if (this.id) {
      this.getById(this.id);
    }
  }

  @Prop({ type: String, require: true })
  private readonly id!: number;

  private getById(id: number): void {
    this.pacienteClient.findById(id).then((success) => {
      this.paciente = success;
    });
  }
}
</script>
