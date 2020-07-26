

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
                state.todos.splice(index, 1, editTodo);
            }
        }
    },





    //state.todos.splice(id, 1, editTodo),

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
        //paginationTodos: state => { return state.pagination },
        todosCount(state, getters) {
            return getters.validTodos.length
        },

    }
}