<template>
  <div class="containerForm" v-if="isVisibleCreateForm" @submit.prevent="submit">
    <form>
      <input type="text" placeholder="Create new todo" v-model="title" maxlength="100" />

      <button type="submit">Create New Todo</button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "",
    };
  },
  props: ["isVisibleCreateForm"],
  methods: {
    ...mapMutations(["createTodo"]),
    submit() {
      this.createTodo({
        title: this.title,
        id: Date.now(),
        dat: new Date().toLocaleString(),
      });
      this.title = "";
      this.$emit("submit", false);
    },
  },
};
</script>

<style scoped>
div.containerForm {
  background-color: bisque;
  max-width: 100%;
}
div.containerForm form {
  position: fixed;
  background-color: bisque;
  border: 2px solid rgb(0, 140, 255);
  width: 80%;
  max-height: 100%;
  padding: 10px;
}
</style>