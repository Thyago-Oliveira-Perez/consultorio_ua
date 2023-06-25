<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Detalhes Pessoais</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Nome</label>
        <p>{{ medico.nome }}</p>
      </div>
      <div id="input-field">
        <label>CPF</label>
        <p>{{ medico.cpf }}</p>
      </div>
      <div id="input-field">
        <label>RG</label>
        <p>{{ medico.rg }}</p>
      </div>
      <div id="input-field">
        <label>Telefone</label>
        <p>{{ medico.telefone }}</p>
      </div>
      <div id="input-field">
        <label>Celular</label>
        <p>{{ medico.celular }}</p>
      </div>
      <div id="input-field">
        <label>Nacionalidade</label>
        <p>{{ medico.nacionalidade }}</p>
      </div>
      <div id="input-field">
        <label>Email</label>
        <p>{{ medico.email }}</p>
      </div>
      <div id="input-field">
        <label>Login</label>
        <p>{{ medico.login }}</p>
      </div>
      <div id="input-field">
        <label>Senha</label>
        <p>**********</p>
      </div>
      <div id="input-field">
        <label>Sexo</label>
        <p>{{ medico.sexo }}</p>
      </div>
    </div>
  </div>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Detalhes Profissionais</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>CRM</label>
        <p>{{ medico.crm }}</p>
      </div>
      <div id="input-field">
        <label>Consultório</label>
        <p>{{ medico.consultorio }}</p>
      </div>
      <div id="input-field">
        <label>Porcentagem de Participação</label>
        <p>{{ medico.porcentParticipacao }}</p>
      </div>
      <div id="input-field">
        <label>Valor da consulta</label>
        <p>{{ medico.valorConsulta }}</p>
      </div>
      <div id="input-field">
        <label>Especialidade</label>
        <p v-if="medico.especialidade">{{ medico.especialidade.nome }}</p>
      </div>
    </div>
  </div>
  <button class="button is-link" style="background-color: #42b983">
    <router-link to="/medicos">Voltar</router-link>
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

import { MedicoClient } from "@/client/medico.client";
import { Medico } from "@/model/medico.model";

export default class DetalhesMedico extends Vue {
  private medicoClient!: MedicoClient;
  public medico = new Medico();

  public mounted(): void {
    this.medicoClient = new MedicoClient();
    if (this.id) {
      this.getById(this.id);
    }
  }

  @Prop({ type: String, require: true })
  private readonly id!: number;

  private getById(id: number): void {
    this.medicoClient.findById(id).then((success) => {
      this.medico = success;
    });
  }
}
</script>
