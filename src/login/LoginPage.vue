<template>
    <div>
        <div class="todo">
            <div class="title">
                <img src="https://icon-library.com/images/todo-list-icon/todo-list-icon-17.jpg" width="100"
                    height="100">
                <h1>TodoApp</h1>
                <h5>Lists & Tasks</h5>
            </div>
        </div>
        <div class="log_in">
            <h3>Log in</h3>
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="username" name="username" class="form-control" placeholder="example..."
                        :class="{ 'is-invalid': submitted && !username }" />
                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                </div>
                <div class="form-group">
                    <button style="background-color: #D5D778; border-radius: 10px; width: 250px;"
                        :disabled="status.loggingIn">
                        <a href="http://localhost:3000/login"></a>
                        Login
                    </button>
                    <img v-show="status.loggingIn"
                        src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    <br />
                    <!-- <router-link to="/register" class="btn btn-link">Register</router-link> -->
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            username: '',
            submitted: false
        }
    },
    computed: {
        ...mapState('account', ['status'])
    },
    created() {
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        handleSubmit(e) {
            this.submitted = true;
            const { username } = this;
            if (username) {
                this.login({ username })
            }
        }
    }
};
</script>
<style>
h3 {
    margin-left: 85px;
}

.todo {
    position: absolute;
    width: 428px;
    height: 730px;
    left: 0px;
    top: 0px;
    background-color: #D5D778;
}

.title {
    position: absolute;
    width: 180px;
    height: 56px;
    left: 124px;
    top: 270px;
    align-items: center;
    text-align: center;
}

.log_in {
    position: absolute;
    width: 250px;
    left: 850px;
    top: 270px;
}

.form-control {
    align-items: center;
}
</style>