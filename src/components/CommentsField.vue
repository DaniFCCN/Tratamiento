<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <header class="px-4 py-3 bg-slate-50/80 border-b border-slate-100">
      <p class="text-sm font-semibold text-slate-800 flex items-center gap-2">
        <span>📝</span>
        Comentarios
      </p>
    </header>
    <div class="p-4">
      <label for="comments" class="block text-sm font-medium text-slate-700 mb-1">Notas del día (texto libre)</label>
      <textarea
        id="comments"
        :value="modelValue"
        class="w-full min-h-[100px] rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 placeholder-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 focus:outline-none resize-y transition-colors"
        placeholder="Cómo te has sentido, observaciones..."
        rows="4"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' }
})

defineEmits(['update:modelValue'])
</script>
