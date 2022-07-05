import { account } from "./account.module"
export default {
    addTask(state, newToDo) {
        if (newToDo.length) {
            state.toDos.push({
                title: newToDo,
                completed: false,
                id: Math.floor(Math.random() * 100),
                description: null,
                user_id: account.state.user.id,
                completed_at: null,
                create_at: Date().toString(),
            })
        }
        state.newTodo = null
    },
    deleteToDo(state, item) {
        const index = state.toDos.indexOf(item)
        state.toDos.splice(index, 1)
    },
    doneEdit(state) {
        state.editting = null
    }
}