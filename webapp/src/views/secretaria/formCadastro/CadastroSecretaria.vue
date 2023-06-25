<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Cadastro Pessoal</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Nome</label>
        <input
          class="input"
          v-model="secretaria.nome"
          type="text"
          placeholder="Nome"
        />
      </div>
      <div id="input-field">
        <label>CPF</label>
        <input
          class="input"
          v-model="secretaria.cpf"
          type="text"
          placeholder="000.000.000-00"
        />
      </div>
      <div id="input-field">
        <label>RG</label>
        <input
          class="input"
          v-model="secretaria.rg"
          type="text"
          placeholder="00.000.000-0"
        />
      </div>
      <div id="input-field">
        <label>Telefone</label>
        <input
          class="input"
          v-model="secretaria.telefone"
          type="tel"
          placeholder="+00 (00) 0 0000-0000"
        />
      </div>
      <div id="input-field">
        <label>Celular</label>
        <input
          class="input"
          v-model="secretaria.celular"
          type="tel"
          placeholder="+00 (00) 0000-0000"
        />
      </div>
      <div id="input-field">
        <label>Nacionalidade</label>
        <div class="select select-option">
          <select v-model="secretaria.nacionalidade">
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
          v-model="secretaria.email"
          type="email"
          placeholder="email@gmail.com"
        />
      </div>
      <div id="input-field">
        <label>Login</label>
        <input
          class="input"
          v-model="secretaria.login"
          type="text"
          placeholder="loginTeste"
        />
      </div>
      <div id="input-field">
        <label>Senha</label>
        <input
          class="input"
          v-model="secretaria.senha"
          type="password"
          placeholder="*********"
        />
      </div>
      <div id="input-field">
        <label>Sexo</label>
        <div class="select select-option">
          <select v-model="secretaria.sexo">
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
    <h1 class="title is-2" style="color: #ffff">Cadastro de Secretaria</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Salário</label>
        <input
          class="input"
          v-model="secretaria.salario"
          type="text"
          placeholder="R$ 00,00"
        />
      </div>
      <div id="input-field">
        <label>Pis</label>
        <input
          class="input"
          v-model="secretaria.pis"
          type="text"
          placeholder="000000000000"
        />
      </div>
      <div id="input-field">
        <label>Data de Contratação</label>
        <input
          class="input"
          v-model="secretaria.dataContratacao"
          type="text"
          placeholder="__/__/__"
        />
      </div>
    </div>
  </div>
  <button class="button is-link button" style="background-color: #42b983">
    <router-link to="/secretarias">Cancelar</router-link>
  </button>
  <button
    class="button is-link"
    style="background-color: #42b983"
    @click="registerSecretaria()"
    v-if="secretaria.id"
  >
    Atualizar
  </button>
  <button
    class="button is-link"
    style="background-color: #42b983"
    @click="registerSecretaria()"
    v-if="!secretaria.id"
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

import { SecretariaClient } from "@/client/secretaria.client";
import { Secretaria } from "@/model/secretaria.model";

export default class CadastroSecretaria extends Vue {
  private secretariaClient!: SecretariaClient;
  public secretaria = new Secretaria();

  public mounted(): void {
    this.secretariaClient = new SecretariaClient();
    if (this.id) {
      this.getById(this.id);
    }
  }

  public registerSecretaria(): void {
    if (this.secretaria.id != null) {
      this.secretariaClient.edit(this.secretaria.id, this.secretaria).then(
        (success) => {
          this.onClickClear();
        },
        (error) => console.log(error)
      );
    } else {
      this.secretariaClient.register(this.secretaria).then(
        (sucess) => {
          console.log(sucess);
          this.secretaria = new Secretaria();
        },
        (error) => console.log(error)
      );
    }
  }

  @Prop({ type: String, require: true })
  private readonly id!: number;

  private getById(id: number): void {
    this.secretariaClient.findById(id).then((success) => {
      this.secretaria = success;
    });
  }

  private onClickClear(): void {
    this.secretaria = new Secretaria();
    this.$router.push({ name: "secretarias" });
  }
}
</script>
