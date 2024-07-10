import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudentView from '../views/Students/View.vue'
import StudentCreate from '../views/Students/Create.vue'
import StudentEdit from '../views/Students/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView,
      //meta: { requiresAuth: true }
    },
    {
      path: '/students/create',
      name: 'studentCreate',
      component: StudentCreate,
      //meta: { requiresAuth: true }
    },
    {
      path: '/students/Edit/:id',
      name: 'studentEdit',
      component: StudentEdit,
      meta: { requiresAuth: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); 
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    next({ name: 'login' }); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
  } else {
    next(); // Continuar con la navegación normalmente
  }
});

export default router
