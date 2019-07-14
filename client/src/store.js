import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { defaultClient as apolloClient } from './main';

import { GET_POSTS, SIGNIN_USER, GET_CURRENT_USER, SIGNUP_USER } from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload;
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthenticationError: (state, payload) => {
      state.authError = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null)
  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true);
      apolloClient.query({
        query: GET_CURRENT_USER
      })
      .then(({ data })  => {
        commit('setLoading', false)
        commit('setUser', data.getCurrentUser)
        console.log(data.getCurrentUser)
      })
      .catch(err => {
        commit('setLoading', false)
        console.log(err)
      })
    },
    getPosts: ({ commit }) => {
      commit('setLoading', true);
      apolloClient
        .query({
          query: GET_POSTS
        }).then(({ data }) => {
          commit("setPosts", data.getPosts);
          commit('setLoading', false);
        })
        .catch(err => {
          commit('setLoading', false);
          console.log(err)
        })
    },
    signinUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading')
      apolloClient
      .mutate({
        mutation: SIGNIN_USER,
        variables: payload
      })
      .then(({ data }) => {
        commit('setLoading', false)
        localStorage.setItem('token', data.signinUser.token);
        router.go();
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err);
        console.log(err)
      })
    },
    signupUser: ({ commit }, payload) => {
      commit('clearError')
      commit('setLoading')
      apolloClient
      .mutate({
        mutation: SIGNUP_USER,
        variables: payload
      })
      .then(({ data }) => {
        commit('setLoading', false)
        localStorage.setItem('token', data.signupUser.token);
        router.go()
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err);
        console.log(err)
      })
    },
    signoutUser: async ({ commit }) => {
      commit('clearUser')
      localStorage.removeItem('token', '')
      console.dir(apolloClient)
      await apolloClient.resetStore()
      router.push('/')
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading,
    user: state => state.user,
    error: state => state.error,
    authError: state => state.authError
  }
});
