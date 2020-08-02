<template>
  <form v-if="isVisibleDescriptionForm" @submit.prevent="submit" @reset.prevent="reset">
    <input type="text" name="change_todo" :value="chengeTitle" />

    <input type="text" name="change_todo" :value="desc" />
    <textarea
      type="text"
      maxlength="100"
      v-model="description"
      placeholder="Create New Description"
    ></textarea>
    <button type="submit">Save</button>
    <button type="reset">Exit</button>
  </form>
</template>


<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      description: "",
    };
  },
  props: ["isVisibleDescriptionForm", "chengeTitle", "id", "dat", "desc"],
  methods: {
    ...mapMutations(["createDescriptionTodos"]),
    submit() {
      if (!this.desc) {
        if (this.description) {
          this.createDescriptionTodos({
            desc: this.description,
            title: this.chengeTitle,
            id: this.id,
            dat: this.dat,
          });
        }
      } else {
        if (this.description) {
          this.createDescriptionTodos({
            desc: this.description,
            title: this.chengeTitle,
            id: this.id,
            dat: this.dat,
          });
        }
      }
      this.description = "";
      this.$emit("submit", true);
    },
    reset() {
      this.$emit("reset", false);
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
button {
  padding: 5px;
  margin: 10px;
}
</style>