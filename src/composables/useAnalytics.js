import { computed } from 'vue'
import { useDiary } from './useDiary.js'

export function useAnalytics() {
  const { entries } = useDiary()

  const allDates = computed(() => Object.keys(entries.value).sort())

  const stats = computed(() => {
    const list = allDates.value
    let daysWithSymptoms = 0
    let daysWithoutSymptoms = 0
    let daysMedMorningOk = 0
    let daysMedEveningOk = 0
    let daysMedMorningMissed = 0
    let daysMedEveningMissed = 0
    let daysWithAnyMissed = 0
    let daysWithComments = 0
    let totalSymptoms = 0

    for (const date of list) {
      const e = entries.value[date]
      const symptoms = e.symptoms || []
      const hasSymptoms = symptoms.length > 0
      if (hasSymptoms) daysWithSymptoms++
      else daysWithoutSymptoms++
      totalSymptoms += symptoms.length

      if (e.medMorning) daysMedMorningOk++
      else daysMedMorningMissed++
      if (e.medEvening) daysMedEveningOk++
      else daysMedEveningMissed++

      if (!e.medMorning || !e.medEvening) daysWithAnyMissed++

      if ((e.comments || '').trim()) daysWithComments++
    }

    const totalDays = list.length
    return {
      totalDays,
      daysWithSymptoms,
      daysWithoutSymptoms,
      totalSymptoms,
      daysMedMorningOk,
      daysMedEveningOk,
      daysMedMorningMissed,
      daysMedEveningMissed,
      daysWithAnyMissed,
      daysWithComments,
      avgSymptomsPerDay: totalDays ? (totalSymptoms / totalDays).toFixed(1) : '0'
    }
  })

  // Listas de fechas para detalle de olvidos (ordenadas más reciente primero)
  const datesMorningMissed = computed(() => {
    return allDates.value.filter((date) => {
      const e = entries.value[date]
      return !e.medMorning
    }).reverse()
  })

  const datesEveningMissed = computed(() => {
    return allDates.value.filter((date) => {
      const e = entries.value[date]
      return !e.medEvening
    }).reverse()
  })

  const datesAnyMissed = computed(() => {
    return allDates.value.filter((date) => {
      const e = entries.value[date]
      return !e.medMorning || !e.medEvening
    }).reverse()
  })

  // Para "cualquier olvido": indica qué tomas se olvidaron cada día
  function getMissedLabel(date) {
    const e = entries.value[date]
    const morning = !e.medMorning
    const evening = !e.medEvening
    if (morning && evening) return 'Mañana y noche'
    if (morning) return 'Mañana'
    if (evening) return 'Noche'
    return '—'
  }

  return { entries, allDates, stats, datesMorningMissed, datesEveningMissed, datesAnyMissed, getMissedLabel }
}
