<template>
  <div class="column is-12">
    <nav>
      <NavBar />
    </nav>
  </div>
  <div class="column is-12">
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from "./components/navBar/NavBar.vue";
import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    NavBar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "~bulma/bulma.sass";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html {
  background-color: #101010;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
