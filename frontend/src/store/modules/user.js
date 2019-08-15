import * as types from "../types";
import * as queries from "../graphQL/user";
import apollo from "../../vue-apollo";

const state = {
  user: {
    id: "",
    username: "",
    email: "",
    isLoggedIn: false
  }
};

const getters = {
  [types.USER](state) {
    return state.user;
  }
};

const mutations = {
  [types.LOGIN](state, payload) {
    state.user = { ...payload, isLoggedIn: true };
  }
};

const actions = {
  [types.LOGIN]({ commit }, { email, password }) {
    return apollo.defaultClient
      .mutate({
        mutation: queries.LOGIN,
        variables: {
          email,
          password
        }
      })
      .then(resp => {
        commit(types.LOGIN, resp.data.login);
      });
  },

  [types.GET_USER]({ commit }) {
    return apollo.defaultClient
      .query({
        query: queries.GET_USER
      })
      .then(resp => {
        commit(types.LOGIN, resp.data.getUser);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
