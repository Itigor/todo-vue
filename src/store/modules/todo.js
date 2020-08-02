

export default {



    state: {
        todos: [],

    },
    mutations: {
        updateTodos: (state, todos) => state.todos = todos,
        createTodo: (state, newTodo) => state.todos.unshift(newTodo),
        updateSelected: (state, newSelected) => state.selected = newSelected,
        editTodo: (state, editTodo) => {
            const index = state.todos.findIndex(n => n.id === editTodo.id);
            if (index !== -1) {
                state.todos[index].title = editTodo.title;
            }
        },
        createDescriptionTodos: (state, newDescription) => {
            const index = state.todos.findIndex(n => n.id === newDescription.id);
            if (index !== -1 && state.todos.description == undefined) {
                state.todos.splice(index, 1, newDescription);
            } else { state.todos[index.description = newDescription.description] }
        }
    },

    actions: {
        async fetchTodos({ commit }) {
            const res = await fetch(
                "https://jsonplaceholder.typicode.com/todos"
            );
            const todos = await res.json();
            commit('updateTodos', todos)

        }
    },

    getters: {
        getState: state => { return state.todos },
        validTodos: state => { return state.todos.filter(t => { return t.title }) },
        todosCount(state, getters) {
            return getters.validTodos.length
        },

    }
}