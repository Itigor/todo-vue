<template>
  <div id="app">
    <hr />
    <table>
      <caption>
        <EditTodoForm
          :isVisibleEditForm="isVisibleEditForm"
          @submit="exitEditTodo"
          :chengeTitle="chengeTitle"
          :id="id"
          :dat="dat"
        />

        <DescriptionTodoForm
          :isVisibleDescriptionForm="isVisibleDescriptionForm"
          @reset="exitDescriptionTodo"
          :chengeTitle="chengeTitle"
          :id="id"
          :dat="dat"
          :desc="description"
        />

        <CreateTodoForm :isVisibleCreateForm="isVisibleCreateForm" @submit="exitCreateTodo" />

        <h2>Todo Lists (active {{todosCount}} todos)</h2>
        <button @click="createTodo">Create Todo</button>
      </caption>
      <tr>
        <th>ID</th>
        <th>TODO</th>
        <th>DATE</th>
        <th>EDIT</th>
      </tr>
      <tr class="todo" v-for="todo in paginatedUsers" :key="todo.id">
        <td class="id">{{todo.id}}</td>
        <td
          class="title"
          @click="DescriptionTodo(todo.title, todo.id, todo.dat, todo.desc)"
        >{{todo.title}}</td>
        <td class="date">{{todo.dat}}</td>
        <td class="button">
          <button type="button" @click="Edit_todo(todo.title, todo.id, todo.dat,  todo.desc)">Edit</button>
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
import { mapGetters, mapActions } from "vuex";

import CreateTodoForm from "./components/CreateTodoForm";
import EditTodoForm from "./components/EditTodoForm";
import DescriptionTodoForm from "./components/DescriptionTodoForm";

export default {
  name: "app",

  components: {
    CreateTodoForm,
    EditTodoForm,
    DescriptionTodoForm,
    // TodoList
  },

  data() {
    return {
      usersPerPage: 10,
      pageCount: 1,
      isVisibleEditForm: false,
      isVisibleCreateForm: false,
      isVisibleDescriptionForm: false,
      chengeTitle: "",
      id: 0,
      title: "",
      dat: 0,
      description: "",
    };
  },

  computed: {
    ...mapGetters(["validTodos", "todosCount"]),
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
    createTodo() {
      this.isVisibleCreateForm = true;
    },
    exitCreateTodo(data) {
      this.isVisibleCreateForm = data;
    },
    exitEditTodo(data) {
      this.isVisibleEditForm = data;
    },
    exitDescriptionTodo(data) {
      this.isVisibleDescriptionForm = data;
    },
    //ddddd
    Edit_todo(todo, id, dat) {
      this.isVisibleEditForm = true;
      this.chengeTitle = todo;
      this.id = id;
      this.dat = dat;
    },
    DescriptionTodo(todo, id, dat, description) {
      this.isVisibleDescriptionForm = true;
      this.chengeTitle = todo;
      this.id = id;
      this.dat = dat;
      this.description = description;
    },
  },
  async mounted() {
    this.fetchTodos();
  },
};
</script>

<style lang="scss">
#app {
  margin: 0;
  padding: 0;
  text-align: center;
}
button {
  padding: 5px;
  margin-bottom: 1rem;
}
table {
  color: white;
  background-color: black;
  width: 80%;
  margin: auto;
  padding: 0;
  td:first-child,
  td:last-child {
    width: 15%;
  }
  th:first-child,
  th:last-child {
    width: 15%;
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
