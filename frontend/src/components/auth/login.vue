<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="login">
        <div class="input">
          <label for="email">Mail</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

    <div id="signup_text" @click="redirectSignup">
      <small>Don't have an account yet? Sign up here!</small>
    </div>
  </div>
</template>

<script>
import * as types from "../../store/types";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  methods: {
    redirectSignup() {
      this.$router.push({ name: "register" });
    },

    login() {
      this.$store
        .dispatch(types.LOGIN, {
          email: this.email,
          password: this.password
        })
        .then(() => this.$router.push("/"))
        .catch(err => {
          console.log("ERROR", err.message);
        });
    }
  }
};
</script>

<style scoped>
.signin-form {
  width: 400px;
  margin: 30px auto 5px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}

#signup_text {
  width: 400px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
}
</style>