<template>
  <div>
    <input type="text" v-model="user.username" />
    <button @click="updateUser">save</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import * as types from "../store/types";

export default {
  computed: {
    ...mapGetters({
      user: types.USER
    })
  },

  methods: {
    updateUser() {
      const data = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password
      };

      this.$store
        .dispatch(types.UPDATE_USER, {
          id: this.user.id,
          data
        })
        .catch(err => console.log(err));
    }
  }
};
</script>