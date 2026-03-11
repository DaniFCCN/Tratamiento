<template>
  <nav
    class="bg-white border border-slate-200 w-full mb-4 rounded-xl shadow-sm overflow-hidden"
    role="navigation"
  >
    <div class="flex items-center justify-between px-4 py-3 md:py-2.5">
      <span class="text-sm font-medium text-slate-500 md:text-slate-600">Menú</span>
      <button
        type="button"
        class="md:hidden p-2 -mr-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
        aria-label="Abrir menú"
        @click="menuOpen = !menuOpen"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <!-- En escritorio: enlaces en línea -->
      <div class="hidden md:flex items-center gap-1">
        <router-link
          to="/diario"
          class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
          :class="isActive('/diario') ? 'text-accent-600 bg-accent-50' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
        >
          Hoy
        </router-link>
        <router-link
          to="/historial"
          class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
          :class="isActive('/historial') ? 'text-accent-600 bg-accent-50' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
        >
          Historial
        </router-link>
        <router-link
          to="/analisis"
          class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
          :class="isActive('/analisis') ? 'text-accent-600 bg-accent-50' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
        >
          Análisis
        </router-link>
        <router-link
          to="/recordatorios"
          class="px-3 py-2 text-sm font-medium rounded-md transition-colors"
          :class="isActive('/recordatorios') ? 'text-accent-600 bg-accent-50' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'"
        >
          Recordatorios
        </router-link>
      </div>
    </div>
    <!-- Móvil: menú desplegable -->
    <div
      class="overflow-hidden transition-all duration-200 ease-out border-t border-slate-100 md:hidden"
      :class="menuOpen ? 'max-h-64 pb-2' : 'max-h-0'"
    >
      <div class="flex flex-col py-1">
        <router-link
          to="/diario"
          class="px-4 py-2.5 text-sm font-medium rounded-lg mx-2 mt-1 transition-colors"
          :class="isActive('/diario') ? 'bg-accent-50 text-accent-600' : 'text-slate-600 hover:bg-slate-50'"
          @click="menuOpen = false"
        >
          Hoy
        </router-link>
        <router-link
          to="/historial"
          class="px-4 py-2.5 text-sm font-medium rounded-lg mx-2 transition-colors"
          :class="isActive('/historial') ? 'bg-accent-50 text-accent-600' : 'text-slate-600 hover:bg-slate-50'"
          @click="menuOpen = false"
        >
          Historial
        </router-link>
        <router-link
          to="/analisis"
          class="px-4 py-2.5 text-sm font-medium rounded-lg mx-2 transition-colors"
          :class="isActive('/analisis') ? 'bg-accent-50 text-accent-600' : 'text-slate-600 hover:bg-slate-50'"
          @click="menuOpen = false"
        >
          Análisis
        </router-link>
        <router-link
          to="/recordatorios"
          class="px-4 py-2.5 text-sm font-medium rounded-lg mx-2 mb-1 transition-colors"
          :class="isActive('/recordatorios') ? 'bg-accent-50 text-accent-600' : 'text-slate-600 hover:bg-slate-50'"
          @click="menuOpen = false"
        >
          Recordatorios
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

function isActive(path) {
  if (path === '/diario') return route.path.startsWith('/diario')
  return route.path === path
}
</script>
