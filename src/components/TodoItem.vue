<template>
  <tr>
    <td>
      <strong>{{todo.id}}</strong>
    </td>
    <td>{{todo.title}}</td>
    <td>
      <button>Edit</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
tr {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  width: 500px;
}
</style>