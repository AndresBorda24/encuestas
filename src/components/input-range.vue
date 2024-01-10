<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { question } from "@/types"

const props = defineProps<{ q: question, value: any }>()

const getMinMax = (rules: [], t: 'min' | 'max') => {
  let r = rules.find(r => r[0] == t);
  if (r == undefined) return (t === 'min') ? 0 : 10;
  return r[1];
}
</script>

<template>
  <FormKit
    type="range"
    :help="`${q.help} | Valor actual: ${value || ''}`"
    :validation="q.rules"
    :label="q.question"
    :value="q.default"
    :name="q.id"
    :min="getMinMax(q.rules as [], 'min')"
    :max="getMinMax(q.rules as [], 'max')"
    step="1"
  >
    <template #prefix>
      <span class="px-2">{{ getMinMax(q.rules as [], 'min') }}</span>
    </template>

    <template #suffix>
      <span class="px-2">{{ getMinMax(q.rules as [], 'max') }}</span>
    </template>
  </FormKit>
</template>
