<template>
  <div class="col-sm-12 offset-sm-8">
    <h1>Hi {{ account.user.firstName + " " + account.user.lastName }}!</h1>
    <i>You're logged in</i>
    <h3>Users :</h3>
    <em v-if="users.loading">Loading users...</em>
    <span v-if="users.error" class="text-danger">ERROR: {{ users.error }}</span>
    <ul v-if="users.items">
      <li v-for="user in users.items" :key="user.id">
        {{ user.username }}
        <span v-if="user.deleting"><em> - Deleting...</em></span>
        <span v-else-if="user.deleteError" class="text-danger">
          - ERROR: {{ user.deleteError }}</span>
        <span v-else>
          - <a @click="deleteUser(user.id)" class="text-danger">Delete</a></span>
      </li>
    </ul>
    <p>
      <router-link to="/login">Logout</router-link>
    </p>
    <h2 style="margin-left: 170px;">TO DO LIST</h2>
    <br />
    <div class="hello">
      {{ count }}
      <div class="box p-4" style="backgroundColor:#D5D778">
        <div class="form-group ml-5 mr-5 row">
          <div class="col-10">
            <input class="form-control" autofocus v-model.trim="newTodo" @keyup.enter="Add"
              placeholder="Click Enter to add..." />
          </div>
          <div class="col-2">
            <button @click="Add" class="btn btn-primary">Add task</button>
          </div>
        </div>
        <div class="m-5 text-left">
          <b> You have {{ allTasks }} task </b>
          <span class="badge badge-warning"> remaining task : {{ notDone }} </span>
          <span class="badge badge-success"> done task : {{ Done }} </span>
        </div>
        <div>
          <table class="mt-3 listTodo">
            <p v-if="toDos.length <= 0">Empty list</p>
            <tr v-for="item in toDos" :key="item.id" :class="{ completed: item.completed }">
              <td>
                <input class="mark" type="checkbox" v-model="item.completed" />
                <span class="checkmark"> </span>
              </td>
              <td>
                <div class="ok">
                  <label @click="edit(item)" style="margin-top: 10px;">
                    {{ item.title | capitalize }}
                  </label>
                  <input v-if="editting == item && item.completed != true" v-model="item.title" :class="{}"
                    @keyup.escape="doneEdit" @keyup.enter="doneEdit" />
                </div>
              </td>
              <td width="20%">
                <a @click="Delete(item)" title="Xóa" class="delete badge badge-danger">
                  x
                </a>
              </td>
              <td>
                <select style="border-radius: 5px;">
                  <option>10%</option> <option>20%</option> <option>30%</option>
                  <option>40%</option> <option>50%</option> <option>60%</option>
                  <option>70%</option> <option>80%</option> <option>90%</option>
                </select>
              </td>
              <td>
                <datepicker :language="vi"></datepicker>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <br />
      <span style="margin-left: 120px;"> Click in task to edit, Enter to submit </span>
    </div>
  </div>
</template>

<script>
const LOCAL_STORAGE_KEY = "todo";
import Datepicker from 'vuejs-datepicker';
import { vi } from 'vuejs-datepicker/dist/locale'
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      toDos: this.$store.state.toDos,
      newTodo: this.$store.state.newToDo,
      editting: this.$store.state.editting,
      vi: vi,
    }
  },
  components: {
    Datepicker
  },
  computed: {
    ...mapState({
      account: (state) => state.account,
      users: (state) => state.users.all,
    }),
    notDone() {
      return this.$store.getters.notDone;
    },
    Done() {
      return this.$store.getters.Done;
    },
    allTasks() {
      return this.$store.getters.allTasks;
    },
    count() {
      return this.$store.getters.count;
    },
  },
  created() {
    this.getAllUsers();
  },
  methods: {
    ...mapActions("users", {
      getAllUsers: "getAll",
      deleteUser: "delete",
    }),
    Add() {
      this.$store.dispatch("addTask", this.newTodo);
    },
    Delete(item) {
      this.$store.dispatch("deleteToDo", item);
    },
    edit(item) {
      this.editting = item;
    },
    doneEdit() {
      this.editting = null;
    },
  },
  filters: {
    capitalize: function (value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  watch: {
    toDos: {
      deep: true,
      handler(newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      },
    },
  },
};
</script>
<style scoped>
.completed label {
  color: #ffffff;
  text-decoration: line-through;
}
</style>
