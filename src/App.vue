<template>
  <div id="app" class="min-h-screen flex flex-col bg-slate-50">
    <!-- Contenedor único: mismo ancho para header, menú y contenido (iPhone) -->
    <div class="flex-1 flex flex-col w-full max-w-xl mx-auto px-4">
      <header class="bg-accent-500 shrink-0 w-full my-5 pt-safe pt-8 pb-8 px-6 rounded-xl shadow-sm text-center">
        <h1 class="text-2xl font-bold text-white tracking-tight">Diario tratamiento Lar</h1>
        <p class="text-sm text-white/90 mt-2 max-w-sm mx-auto">Síntomas, medicación y comentarios por día</p>
      </header>

      <NavBar />

      <main class="flex-1 w-full pb-6 pb-safe">
        <router-view />
      </main>

      <footer class="shrink-0 text-center text-slate-500 text-xs py-3 w-full">
        Los datos se guardan solo en este dispositivo.
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import NavBar from './components/NavBar.vue'
import { useDiary } from './composables/useDiary.js'
import { useReminderChecker } from './composables/useReminders.js'

const { getEntry } = useDiary()
const { checkAndNotify } = useReminderChecker(getEntry)

let intervalId = null

onMounted(() => {
  checkAndNotify()
  intervalId = setInterval(checkAndNotify, 60 * 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
