<template>
  <div>
    <form @submit.prevent="submit">
      <input type="text" placeholder="Create new todo" v-model="title" />

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

  methods: {
    ...mapMutations(["createTodo"]),
    submit() {
      this.createTodo({
        title: this.title,
        id: Date.now(),
        dat: new Date().toLocaleString(),
      });
      this.title = "";
    },
  },
};
</script>

<style scoped>
input {
  margin: auto;
  display: block;
  width: 500px;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
}
</style>