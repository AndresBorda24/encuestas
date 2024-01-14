<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { question } from "@/types"

const props = defineProps<{ question: question, value: any }>()
const getMinMax = (rules: [], t: 'min' | 'max') => {
  let r = rules.find(r => r[0] == t);
  if (r == undefined) return (t === 'min') ? 0 : 10;
  return r[1];
}
</script>

<template>
  <FormKit
    type="range"
    :help="`${question.help} | Valor actual: ${value || ''}`"
    :validation="question.rules"
    :label="question.question"
    :value="question.default"
    :name="question.id"
    :min="getMinMax(question.rules as [], 'min')"
    :max="getMinMax(question.rules as [], 'max')"
    step="1"
  >
    <template #prefix>
      <span class="px-2">{{ getMinMax(question.rules as [], 'min') }}</span>
    </template>

    <template #suffix>
      <span class="px-2">{{ getMinMax(question.rules as [], 'max') }}</span>
    </template>
  </FormKit>
</template>
