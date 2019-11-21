import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    questions: [],
    questionDetail: {},
    answers: [],
    myQuestions: [],
    trending: [],
    questionTag: []
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.isLogin = payload
    },
    GET_QUESTION(state, payload) {
      state.questions = payload
    },
    SET_DETAIL(state, payload) {
      state.questionDetail = payload
    },
    SET_ANSWER(state, payload) {
      state.answers = payload
    },
    SET_MYQUESTION(state, payload) {
      state.myQuestions = payload
    },
    SET_TRENDING(state, payload) {
      state.trending = payload
    },
    QUESTION_BYTAG(state, payload) {
      state.questionTag = payload
    }
  },
  actions: {
    auth({ commit }) {
      if (localStorage.getItem('token')) {
        commit('SET_LOGIN', true)
      } else {
        commit('SET_LOGIN', false)
      }
    },
    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        return axios({
          method: 'post',
          url: `http://localhost:3000/users/register`,
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            commit('SET_LOGIN', true)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/users/login`,
          data: {
            identity: payload.identity,
            password: payload.password
          }
        })
          .then(({ data }) => {
            commit('SET_LOGIN', true)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getQuestion({ commit }, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/question`
      })
        .then(({ data }) => {
          commit('GET_QUESTION', data)
        })
        .catch(err => {
          console.log(err.response.data);
        })
    },
    addQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/question`,
          data: {
            title: payload.title,
            description: payload.description,
            tags: payload.tags
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getDetail({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/question/detail/${payload.id}`
        })
          .then(({ data }) => {
            commit('SET_DETAIL', data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getAnswer({ commit }, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/answer/getAll/${payload.id}`
      })
        .then(({ data }) => {
          commit('SET_ANSWER', data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    addAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: `http://localhost:3000/answer/addAnswer/${payload.id}`,
          data: {
            answer: payload.answer
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    upVote({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `http://localhost:3000/question/upVote/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    downVote({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `http://localhost:3000/question/downVote/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    upVoteAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `http://localhost:3000/answer/upVote/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    downVoteAnswer({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `http://localhost:3000/answer/downVote/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    myQuestion({ commit }, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/question/myQuestion`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_MYQUESTION', data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    deleteQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'delete',
          url: `http://localhost:3000/question/delete/${payload.id}`,
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    editQuestion({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'patch',
          url: `http://localhost:3000/question/update/${payload.id}`,
          data: {
            title: payload.title,
            description: payload.description,
            tags: payload.tags
          },
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    trending({ commit }, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/question/trending`
      })
        .then(({ data }) => {
        commit('SET_TRENDING', data)
        })
        .catch(err => {
        console.log(err);
      })
    },
    getByTag({ commit }, payload) {
      axios({
        method: 'get',
        url: `http://localhost:3000/question/search?q=${payload.tag}`
      })
        .then(({ data }) => {
          commit('QUESTION_BYTAG', data)
        })
        .catch(err => {
          console.log(err);
        })
    },
    getQuote({commit}, payload) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: `http://localhost:3000/question/getQuote`,
        })
          .then(({ data }) => {
            console.log(data);
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    }
  }
})
