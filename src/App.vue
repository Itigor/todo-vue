<template>
  <div id="app">
    <form v-if="isVisible" @submit.prevent="submit">
      <input type="text" name="change_todo" :value="this.chengeTitle" />
      <input type="text" placeholder="Edit this todo" v-model="title" />

      <button type="submit">Edit</button>
    </form>

    <TodoForm />

    <hr />
    <table>
      <caption>
        <h1>Todo Lists (active {{todosCount}} todos)</h1>
      </caption>
      <tr>
        <th>ID</th>
        <th>TODO</th>
        <th>DATE</th>
        <th>EDIT</th>
      </tr>
      <tr class="todo" v-for="todo in paginatedUsers" :key="todo.id">
        <td class="id">{{todo.id}}</td>
        <td class="title">{{todo.title}}</td>
        <td class="date">{{todo.dat}}</td>
        <td class="button">
          <button
            type="button"
            @click="Edit_todo(todo.title, todo.id, todo.dat)"
            value="todo.title"
          >Edit</button>
        </td>
      </tr>
    </table>
    <Paginate
      :page-count="pages"
      :click-handler="pageClick"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    />

    <hr />
  </div>
</template>


<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

import TodoForm from "./components/TodoForm";

export default {
  name: "app",
  data() {
    return {
      usersPerPage: 10,
      pageCount: 1,
      isVisible: false,
      chengeTitle: "",
      id: 0,
      title: "",
    };
  },

  computed: {
    ...mapGetters(["validTodos", "todosCount", "getState"]),
    pages() {
      return Math.ceil(this.validTodos.length / 10);
    },

    paginatedUsers() {
      let from = (this.pageCount - 1) * this.usersPerPage;
      let to = from + this.usersPerPage;
      return this.validTodos.slice(from, to);
    },
  },
  methods: {
    ...mapActions(["fetchTodos"]),
    pageChangeHandler(pages) {
      this.validTodos = this.validTodos[pages - 1] || this.validTodos[0];
    },
    pageClick(pages) {
      this.pageCount = pages;
    },

    Edit_todo(todo, id, dat) {
      this.isVisible = true;
      this.chengeTitle = todo;
      this.id = id;
      this.dat = dat;
    },

    ...mapMutations(["editTodo"]),
    submit() {
      this.editTodo({
        title: this.title,
        id: this.id,
        dat: this.dat,
      });
      this.title = "";
      this.isVisible = false;
    },
  },
  async mounted() {
    this.fetchTodos();
  },

  components: {
    TodoForm,
    // TodoList
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  text-align: center;
}
table {
  color: white;
  background-color: black;
  width: 100%;
  margin: auto;
  padding: 0;
  td:first-child {
    width: 10%;
  }
  th:first-child {
    width: 10%;
  }
}
tr {
  border: 1px solid white;
  display: flex;
  justify-content: space-between;
  height: 4rem;
}

td {
  border-right: 1px solid white;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
  width: 30%;
}
th {
  border-right: 1px solid black;
  padding: 0.5rem 2rem;
  display: flex;
  justify-content: center;
  width: 30%;
}
caption {
  background-color: black;
}
@import "~materialize-css/dist/css/materialize.min.css";
@import "assets/index.css";
</style>
