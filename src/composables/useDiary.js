import { ref, computed, watch } from 'vue'

const STORAGE_KEY = 'diario-salud-v1'

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveToStorage(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) {
    console.warn('No se pudo guardar en localStorage', e)
  }
}

function dateKey(date) {
  if (typeof date === 'string') return date
  const d = date instanceof Date ? date : new Date(date)
  return d.toISOString().slice(0, 10)
}

export function useDiary() {
  const data = ref(loadFromStorage())

  watch(data, (val) => saveToStorage(val), { deep: true })

  const entries = computed(() => data.value)

  function getEntry(date) {
    const key = dateKey(date)
    return data.value[key] ?? {
      symptoms: [],
      medMorning: false,
      medEvening: false,
      comments: ''
    }
  }

  function setEntry(date, entry) {
    const key = dateKey(date)
    data.value = { ...data.value, [key]: { ...getEntry(date), ...entry } }
  }

  function addSymptom(date, symptom) {
    const key = dateKey(date)
    const entry = getEntry(date)
    const symptoms = [...(entry.symptoms || []), { id: Date.now(), text: symptom.trim() }]
    setEntry(date, { ...entry, symptoms })
  }

  function removeSymptom(date, symptomId) {
    const entry = getEntry(date)
    const symptoms = (entry.symptoms || []).filter(s => s.id !== symptomId)
    setEntry(date, { ...entry, symptoms })
  }

  function updateSymptom(date, symptomId, text) {
    const entry = getEntry(date)
    const symptoms = (entry.symptoms || []).map(s =>
      s.id === symptomId ? { ...s, text: text.trim() } : s
    )
    setEntry(date, { ...entry, symptoms })
  }

  function setMedMorning(date, value) {
    const entry = getEntry(date)
    setEntry(date, { ...entry, medMorning: !!value })
  }

  function setMedEvening(date, value) {
    const entry = getEntry(date)
    setEntry(date, { ...entry, medEvening: !!value })
  }

  function setComments(date, text) {
    const entry = getEntry(date)
    setEntry(date, { ...entry, comments: (text || '').trim() })
  }

  return {
    entries,
    getEntry,
    setEntry,
    addSymptom,
    removeSymptom,
    updateSymptom,
    setMedMorning,
    setMedEvening,
    setComments
  }
}
