<template>
  <div id="navBar">
    <div id="icone-consultorio">
      <router-link to="/"
        ><img src="../../assets/iconMain.png" alt=""
      /></router-link>
    </div>
    <div id="menu">
      <div id="sub-menu">
        <button><router-link to="/">Home</router-link></button>
      </div>
      <div id="linha-vertical"></div>
      <div id="sub-menu">
        <SubMenu :options="valoresAgenda" />
      </div>
      <div id="linha-vertical"></div>
      <div id="sub-menu">
        <SubMenu :options="valoresPessoa" />
      </div>
      <div id="linha-vertical"></div>
      <div id="sub-menu">
        <SubMenu :options="valoresAdmin" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import SubMenu from "./submenu/SubMenu.vue";

@Options({
  components: {
    SubMenu,
  },
})
export default class NavBar extends Vue {
  valoresAgenda = {
    menu: "Agenda",
    options: [
      {
        name: "Agendamentos",
        url: "/agendamentos",
      },
    ],
  };

  valoresPessoa = {
    menu: "Pessoas",
    options: [
      {
        name: "Medicos",
        url: "/medicos",
      },
      {
        name: "Secretarias",
        url: "/secretarias",
      },
      {
        name: "Pacientes",
        url: "/pacientes",
      },
    ],
  };

  valoresAdmin = {
    menu: "Administração",
    options: [
      {
        name: "Convênio",
        url: "/convenios",
      },
      {
        name: "Historico",
        url: "/historicos",
      },
      {
        name: "Especialidade",
        url: "/especialidades",
      },
    ],
  };
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  align-items: center;
  justify-content: center;
}

#icone-consultorio {
  width: 10%;
}

img {
  width: 60px;
  height: 60px;
}

button {
  border: none;
  background-color: #f8f8f8;
  font-size: 18px;
}

#linha-vertical {
  border-radius: 2px;
  border: solid 2px black;
}

#navBar {
  display: flex;
  width: auto;
  align-items: center;
}

#menu {
  display: flex;
  flex-wrap: wrap;
  width: 60%;
  align-items: center;
  justify-content: space-around;
  background-color: #f8f8f8;
  border-radius: 3px;
  padding: 5px;
}

#sub-menu {
  width: auto;
}
</style>
