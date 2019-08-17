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
  },

  [types.LOGOUT](state) {
    state.user = { isLoggedIn: false };
  }
};

const actions = {
  [types.LOGIN]({ commit }, { email, password }) {
    return apollo
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

  [types.LOGOUT]({ commit }) {
    return apollo
      .mutate({
        mutation: queries.LOGOUT
      })
      .then(() => {
        commit(types.LOGOUT);
        apollo.clearStore();
      });
  },

  [types.GET_USER]({ commit }) {
    return apollo
      .query({
        query: queries.GET_USER
      })
      .then(resp => {
        commit(types.LOGIN, resp.data.user);
      });
  },

  [types.UPDATE_USER]({ commit }, { id, data }) {
    return apollo
      .mutate({
        mutation: queries.UPDATE_USER,
        variables: {
          id,
          data
        }
      })
      .then(resp => {
        commit(types.LOGIN, resp.data.user);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
