import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Question from './components/Questions.vue'
import AddQuestion from './components/form/AddQuestion'
import QuestionDetail from './components/QuestionDetail.vue'
import MyQuestion from './components/MyQuestion.vue'
import FormEdit from './components/form/FormEdit'
import QuestionTag from './components/QuestionTag'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'question',
          component: Question
        },
        {
          path: '/add-question',
          name: 'addQuestion',
          component: AddQuestion
        },
        {
          path: '/question-detail/:id',
          name: 'QuestionDetail',
          component: QuestionDetail
        },
        {
          path: '/my-question',
          name: 'myQuestion',
          component: MyQuestion,
          beforeEnter: (to, from, next) => {
            if (localStorage.getItem('token')) {
              next()
            } else {
              next('/')
            }
          }
        },
        {
          path: '/update/:id',
          name: 'updateQuestion',
          component: FormEdit
        },
        {
          path: '/search-tag/:tag',
          name: 'QuestionTag',
          component: QuestionTag
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
