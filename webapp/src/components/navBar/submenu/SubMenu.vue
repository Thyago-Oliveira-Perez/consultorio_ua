<template>
  <div class="dropdown is-hoverable">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
        <span>{{ options.menu }}</span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content-small" id="content-dropDown-style">
        <li v-for="option in options.options" :key="option">
          <router-link :to="option.url">{{ option.name }}</router-link>
        </li>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    options: Object,
  },
})
export default class SubMenu extends Vue {
  options!: any;
}
</script>

<style scoped lang="scss">
button {
  border: none;
  background-color: #f8f8f8;
}

span {
  text-align: center;
}
li {
  display: flex;
  align-items: center;
  justify-content: center;
}

li:hover {
  background-color: #f0f0f0;
}

a {
  color: #42b983;
}

#content-dropDown-style {
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  border-radius: 3px;
  width: auto;
}
</style>
