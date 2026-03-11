import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/diario' },
  { path: '/diario', name: 'Diario', component: () => import('../views/DiarioView.vue'), meta: { title: 'Diario' } },
  { path: '/diario/:date', name: 'DiarioFecha', component: () => import('../views/DiarioView.vue'), meta: { title: 'Diario' } },
  { path: '/historial', name: 'Historial', component: () => import('../views/HistorialView.vue'), meta: { title: 'Historial' } },
  { path: '/analisis', name: 'Analisis', component: () => import('../views/AnalisisView.vue'), meta: { title: 'Análisis' } },
  { path: '/recordatorios', name: 'Recordatorios', component: () => import('../views/RecordatoriosView.vue'), meta: { title: 'Recordatorios' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} · Diario de Salud` : 'Diario de Salud'
})

export default router
