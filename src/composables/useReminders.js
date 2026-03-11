import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'diario-salud-reminders-v1'
const NOTIFIED_KEY = 'diario-salud-notified'

const defaultConfig = {
  enabled: false,
  morningTime: '08:00',
  eveningTime: '20:00'
}

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultConfig, ...JSON.parse(raw) }
  } catch {}
  return { ...defaultConfig }
}

function saveConfig(config) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  } catch {}
}

function loadNotified() {
  try {
    const raw = localStorage.getItem(NOTIFIED_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {}
  return {}
}

function saveNotified(obj) {
  try {
    localStorage.setItem(NOTIFIED_KEY, JSON.stringify(obj))
  } catch {}
}

function parseTime(str) {
  const [h, m] = (str || '00:00').split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

function nowMinutes() {
  const d = new Date()
  return d.getHours() * 60 + d.getMinutes()
}

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function useReminders() {
  const config = ref(loadConfig())

  watch(config, (val) => saveConfig(val), { deep: true })

  async function requestPermission() {
    if (!('Notification' in window)) return 'unsupported'
    if (Notification.permission === 'granted') return 'granted'
    if (Notification.permission === 'denied') return 'denied'
    const result = await Notification.requestPermission()
    return result
  }

  function getPermission() {
    return ('Notification' in window) ? Notification.permission : 'unsupported'
  }

  function setEnabled(value) {
    config.value.enabled = !!value
  }

  function setMorningTime(value) {
    config.value.morningTime = value || defaultConfig.morningTime
  }

  function setEveningTime(value) {
    config.value.eveningTime = value || defaultConfig.eveningTime
  }

  return {
    config: computed(() => config.value),
    requestPermission,
    getPermission,
    setEnabled,
    setMorningTime,
    setEveningTime
  }
}

// Composable para ejecutar la lógica de comprobación (llamar desde App o layout)
export function useReminderChecker(getEntryFn) {
  function checkAndNotify() {
    const cfg = loadConfig()
    if (!cfg.enabled || !('Notification' in window) || Notification.permission !== 'granted') return

    const today = todayKey()
    const entry = getEntryFn(today)
    const now = nowMinutes()
    const morning = parseTime(cfg.morningTime)
    const evening = parseTime(cfg.eveningTime)

    let notified = loadNotified()

    if (now >= morning && !entry.medMorning && notified[`${today}-m`] !== true) {
      new Notification('Diario de Salud', {
        body: '¿Has tomado ya la medicación de la mañana?',
        icon: '/favicon.svg'
      })
      notified[`${today}-m`] = true
      saveNotified(notified)
    }

    if (now >= evening && !entry.medEvening && notified[`${today}-e`] !== true) {
      new Notification('Diario de Salud', {
        body: '¿Has tomado ya la medicación de la noche?',
        icon: '/favicon.svg'
      })
      notified[`${today}-e`] = true
      saveNotified(notified)
    }
  }

  return { checkAndNotify }
}
