<template>
  <div class="w-full pt-2">
    <h2 class="text-lg font-semibold text-slate-800 mb-1">Recordatorios de medicación</h2>
    <p class="text-sm text-slate-500 mb-4">
      Recibe una notificación si no has marcado la toma cuando llega la hora.
    </p>

    <div class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-4">
      <div class="p-4">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            v-model="enabled"
            type="checkbox"
            class="rounded border-slate-300 text-accent-500 focus:ring-accent-500 w-5 h-5"
            @change="onEnabledChange"
          />
          <span class="font-medium text-slate-800">Activar recordatorios</span>
        </label>

        <div v-if="permissionStatus === 'denied'" class="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
          Las notificaciones están bloqueadas. Actívalas en la configuración del navegador o del dispositivo para recibir avisos.
        </div>

        <template v-if="enabled">
          <div class="mt-4">
            <label class="block text-sm font-medium text-slate-700 mb-1">Hora recordatorio mañana</label>
            <input
              v-model="morningTime"
              type="time"
              class="w-full max-w-[10rem] rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none"
              @change="onMorningChange"
            />
          </div>
          <div class="mt-3">
            <label class="block text-sm font-medium text-slate-700 mb-1">Hora recordatorio noche</label>
            <input
              v-model="eveningTime"
              type="time"
              class="w-full max-w-[10rem] rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none"
              @change="onEveningChange"
            />
          </div>

          <div v-if="permissionStatus === 'default'" class="mt-4">
            <button
              type="button"
              class="rounded-lg bg-accent-500 px-4 py-2.5 text-white font-medium hover:bg-accent-600 transition-colors"
              @click="requestPermission"
            >
              Permitir notificaciones
            </button>
          </div>
          <p v-else-if="permissionStatus === 'granted'" class="mt-3 text-sm text-accent-600">
            ✓ Notificaciones permitidas
          </p>
        </template>
      </div>
    </div>

    <div class="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
      <p class="text-xs text-slate-600">
        <strong class="text-slate-700">En el móvil:</strong> Abre esta página en Safari y, si quieres que los avisos lleguen aunque no tengas la pestaña abierta, añade la web a la pantalla de inicio (Compartir → Añadir a pantalla de inicio). En algunos dispositivos las notificaciones solo se muestran cuando la app está abierta o en primer plano.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useReminders } from '../composables/useReminders.js'

const {
  config,
  requestPermission: askPermission,
  getPermission,
  setEnabled,
  setMorningTime,
  setEveningTime
} = useReminders()

const enabled = ref(config.value.enabled)
const morningTime = ref(config.value.morningTime)
const eveningTime = ref(config.value.eveningTime)

const permissionStatus = ref(getPermission())

async function requestPermission() {
  permissionStatus.value = await askPermission()
}

function onEnabledChange() {
  setEnabled(enabled.value)
}

function onMorningChange() {
  setMorningTime(morningTime.value)
}

function onEveningChange() {
  setEveningTime(eveningTime.value)
}

onMounted(() => {
  permissionStatus.value = getPermission()
})

watch(config, (c) => {
  if (c) {
    enabled.value = c.enabled
    morningTime.value = c.morningTime
    eveningTime.value = c.eveningTime
  }
}, { deep: true })
</script>
