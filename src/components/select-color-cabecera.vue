<script setup lang="ts">
const props =withDefaults(defineProps<{
  modelValue: string
}>(), { modelValue: 'blue' });
const emit = defineEmits(['update:modelValue']);

const colors = {
  'blue': 'bg-blue-600 bg-blue-800 text-blue-200 text-blue-100',
  'teal': 'bg-teal-600 bg-teal-800 text-teal-200 text-teal-100',
  'indigo': 'bg-indigo-600 bg-indigo-800 text-indigo-200 text-indigo-100',
  'neutral': 'bg-neutral-600 bg-neutral-800 text-neutral-200 text-neutral-100'
};
</script>

<template>
  <div class="flex gap-3">
    <label
      v-for="(c, key) in colors" :key="key"
      :for="`$color-${key}`"
      :class="[`bg-${key}-600 border border-white h-6 w-6 ratio-1 rounded-full cursor-pointer`, {
        'outline-1 outline-white outline-offset-2 outline': (key == modelValue)
      }]"
    >
      <input
        type="radio"
        :value="key"
        @change="$emit('update:modelValue', $event.target.value)"
        name="encuesta_color"
        :id="`$color-${key}`"
        class="appearence-none h-0"
      >
    </label>
  </div>
</template>
