<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Cadastro Pessoal</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Nome</label>
        <input
          class="input"
          v-model="paciente.nome"
          type="text"
          placeholder="Nome"
        />
      </div>
      <div id="input-field">
        <label>CPF</label>
        <input
          class="input"
          v-model="paciente.cpf"
          type="text"
          placeholder="000.000.000-00"
        />
      </div>
      <div id="input-field">
        <label>RG</label>
        <input
          class="input"
          v-model="paciente.rg"
          type="text"
          placeholder="00.000.000-0"
        />
      </div>
      <div id="input-field">
        <label>Telefone</label>
        <input
          class="input"
          v-model="paciente.telefone"
          type="tel"
          placeholder="+00 (00) 0 0000-0000"
        />
      </div>
      <div id="input-field">
        <label>Celular</label>
        <input
          class="input"
          v-model="paciente.celular"
          type="tel"
          placeholder="+00 (00) 0000-0000"
        />
      </div>
      <div id="input-field">
        <label>Nacionalidade</label>
        <div class="select select-option">
          <select v-model="paciente.nacionalidade">
            <option>BRASILEIRO(A)</option>
            <option>Paraguai</option>
            <option>Argentina</option>
            <option>Uruguai</option>
            <option>Colômbia</option>
            <option>Bolívia</option>
          </select>
        </div>
      </div>
      <div id="input-field">
        <label>Email</label>
        <input
          class="input"
          v-model="paciente.email"
          type="email"
          placeholder="email@gmail.com"
        />
      </div>
      <div id="input-field">
        <label>Login</label>
        <input
          class="input"
          v-model="paciente.login"
          type="text"
          placeholder="loginTeste"
        />
      </div>
      <div id="input-field">
        <label>Senha</label>
        <input
          class="input"
          v-model="paciente.senha"
          type="password"
          placeholder="*********"
        />
      </div>
      <div id="input-field">
        <label>Sexo</label>
        <div class="select select-option">
          <select v-model="paciente.sexo">
            <option></option>
            <option>masculino</option>
            <option>feminino</option>
            <option>outro</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Cadastro de Paciente</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Tipo de Atendimento</label>
        <div class="select select-option">
          <select v-model="paciente.tipoAtendimento">
            <option>particular</option>
            <option>convenio</option>
          </select>
        </div>
      </div>
      <div id="input-field">
        <label>Número do Cartão</label>
        <input
          class="input"
          v-model="paciente.numeroCartao"
          type="text"
          placeholder="000000000000"
        />
      </div>
      <div id="input-field" v-if="paciente.convenio">
        <label>Data de Vencimento do Convênio</label>
        <input
          class="input"
          v-model="paciente.dataVencimento"
          type="datetime-local"
          placeholder="__/__/__"
        />
      </div>
      <div id="input-field" v-if="paciente.convenio">
        <label>Nome do convênio</label>
        <input
          class="input"
          v-model="paciente.convenio.nome"
          type="text"
          placeholder=""
        />
      </div>
    </div>
  </div>
  <button class="button is-link" style="background-color: #42b983">
    <router-link to="/pacientes">Cancelar</router-link>
  </button>
  <button
    class="button is-link"
    style="background-color: #42b983"
    @click="registerPaciente()"
    v-if="paciente.id"
  >
    Atualizar
  </button>
  <button
    class="button is-link"
    style="background-color: #42b983"
    @click="registerPaciente()"
    v-if="!paciente.id"
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

import { PacienteClient } from "@/client/paciente.client";
import { Paciente } from "@/model/paciente.model";

export default class CadastroPaciente extends Vue {
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

  private onClickClear(): void {
    this.paciente = new Paciente();
    this.$router.push({ name: "pacientes" });
  }

  public registerPaciente(): void {
    if (this.paciente.id != null) {
      this.pacienteClient.edit(this.paciente.id, this.paciente).then(
        (success) => {
          this.onClickClear();
        },
        (error) => console.log(error)
      );
    } else {
      this.pacienteClient.register(this.paciente).then(
        (sucess) => {
          console.log(sucess);
          this.paciente = new Paciente();
        },
        (error) => console.log(error)
      );
    }
  }
}
</script>
