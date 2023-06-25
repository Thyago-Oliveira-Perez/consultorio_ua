<template>
  <div id="container">
    <h1 class="title is-2" style="color: #ffff">Cadastrar Agendamento</h1>
    <div id="cadastro">
      <div id="input-field">
        <label>Período</label>
        <div id="input-field-date">
          <div id="input-field-date-option">
            <input class="input" type="date" />
          </div>
          <div id="input-field-date-option">
            <input class="input" type="date" />
          </div>
        </div>
      </div>
      <div id="input-field">
        <label>Observação</label>
        <input class="input" type="tel" placeholder="Observação" />
      </div>
      <div id="input-field">
        <label>Status de Agendamento</label>
        <div class="select select-option">
          <select>
            <option>Pendente</option>
            <option>Aprovado</option>
          </select>
        </div>
      </div>
      <div id="input-field"></div>
    </div>
  </div>
  <button class="button is-link" style="background-color: #42b983">
    <a href="/agendamentos">Cancelar</a>
  </button>
  <button class="button is-link button" style="background-color: #42b983">
    Cadastrar
  </button>
</template>

<style>
#container {
  margin: 5px 0;
}

#cadastro {
  display: flex;
  flex-direction: column;
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
  width: 50%;
  margin: 6px 0;
}

#input-field-date {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 6px 0;
}

#input-field-date-option{
  width: 48%;
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
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
  props: {},
})
export default class CadastroMedico extends Vue {}
</script>
