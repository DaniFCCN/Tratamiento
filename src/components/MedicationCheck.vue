<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <header class="px-4 py-3 bg-slate-50/80 border-b border-slate-100">
      <p class="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <span>💊</span>
        Medicación
      </p>
    </header>
    <div class="p-4 space-y-3">
      <label class="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 cursor-pointer hover:bg-slate-100/80 transition-colors">
        <input
          type="checkbox"
          class="rounded border-slate-300 text-accent-500 focus:ring-accent-500 w-5 h-5"
          :checked="medMorning"
          @change="$emit('update:medMorning', ($event.target).checked)"
        />
        <span class="font-medium text-slate-800">Medicación de la mañana</span>
      </label>
      <label class="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 cursor-pointer hover:bg-slate-100/80 transition-colors">
        <input
          type="checkbox"
          class="rounded border-slate-300 text-accent-500 focus:ring-accent-500 w-5 h-5"
          :checked="medEvening"
          @change="$emit('update:medEvening', ($event.target).checked)"
        />
        <span class="font-medium text-slate-800">Medicación de la noche</span>
      </label>
    </div>
  </div>
</template>

<script setup>
defineProps({
  medMorning: { type: Boolean, default: false },
  medEvening: { type: Boolean, default: false }
})

defineEmits(['update:medMorning', 'update:medEvening'])
</script>
