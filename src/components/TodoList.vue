<template>
  <table>
    <TodoItem v-for="(todo,id) in todos" v-bind:key="id" v-bind:todo="todo" />
  </table>
</template>

<script>
import TodoItem from "@/components/TodoItem";
export default {
  props: ["todos"],
  components: {
    TodoItem
  }
};
</script>


<style scoped>
table {
  margin: auto;
}
</style>