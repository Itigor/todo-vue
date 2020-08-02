<template>
  <form v-if="isVisibleEditForm" @submit.prevent="submit">
    <input type="text" name="change_todo" :value="chengeTitle" />
    <input type="text" placeholder="Edit this todo" v-model="title" maxlength="100" />

    <button type="submit">Edit</button>
  </form>
</template>



<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "",
    };
  },
  props: ["isVisibleEditForm", "chengeTitle", "id", "dat"],
  methods: {
    ...mapMutations(["editTodo"]),
    submit() {
      if (this.title) {
        this.editTodo({
          title: this.title,
          id: this.id,
          dat: this.dat,
        });
        this.title = "";
        this.$emit("submit", false);
      } else this.$emit("submit", false);
    },
  },
};
</script>

<style scoped>
form {
  position: fixed;

  background-color: bisque;
  border: 2px solid rgb(0, 140, 255);
  width: 80%;
  max-height: 100%;
  padding: 10px;
}
</style>