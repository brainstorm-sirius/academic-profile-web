import { createRouter, createWebHistory } from 'vue-router'

const LoginView = () => import('@/views/LoginView.vue')
const RegisterView = () => import('@/views/RegisterView.vue')
const ProfileView = () => import('@/views/ProfileView.vue')
const AuthorView = () => import('@/views/AuthorView.vue')
const CollaborationView = () => import('@/views/CollaborationView.vue')
const EditInterestsView = () => import('@/views/EditInterestsView.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/author',
      name: 'author',
      component: AuthorView
    },
    {
      path: '/collaboration',
      name: 'collaboration',
      component: CollaborationView
    },
    {
      path: '/edit-interests',
      name: 'edit-interests',
      component: EditInterestsView
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router

