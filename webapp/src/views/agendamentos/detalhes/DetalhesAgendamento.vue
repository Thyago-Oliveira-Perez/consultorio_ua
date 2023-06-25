<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Detalhes Agendamento</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Período</label>
        <p>{{ agenda.dataDe }} até {{ agenda.dataAte }}</p>
      </div>
      <div id="input-field">
        <label>Observação</label>
        <p v-if="!agenda.observacao">Não possui observação.</p>
        <p v-if="agenda.observacao">{{ agenda.observacao }}</p>
      </div>
      <div id="input-field">
        <label>Status de Agendamento</label>
        <p>{{ agenda.status }}</p>
      </div>
      <div id="input-field">
        <label>Médco</label>
        <p v-if="agenda.medico">{{ agenda.medico.nome }}</p>
      </div>
      <div id="input-field">
        <label>Paciente</label>
        <p v-if="agenda.paciente">{{ agenda.paciente.nome }}</p>
      </div>
    </div>
  </div>
  <button class="button is-link" style="background-color: #42b983">
    <router-link to="/agendamentos">Voltar</router-link>
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

import { AgendaClient } from "@/client/agenda.client";
import { Agenda } from "@/model/agenda.model";

export default class DetalhesAgendamento extends Vue {
  private agendaClient!: AgendaClient;
  public agenda = new Agenda();

  public mounted(): void {
    this.agendaClient = new AgendaClient();
    if (this.id) {
      this.getById(this.id);
    }
  }

  @Prop({ type: String, require: true })
  private readonly id!: number;

  private getById(id: number): void {
    this.agendaClient.findById(id).then((success) => {
      this.agenda = success;
    });
  }
}
</script>
