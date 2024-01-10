<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { question } from "@/types"

const props = defineProps<{ q: question }>()
</script>

<template>
  <FormKit
    :type="q.type"
    :help="q.help"
    :placeholder="q.placeholder"
    :validation="q.rules"
    :options="q.options"
    :label="q.question"
    :value="q.default"
    :name="q.id"
  ></FormKit>
  <template v-if="q.confirmation">
    <FormKit
      :type="q.type"
      :placeholder="q.placeholder"
      :label="`${q.question} - Confirmación`"
      :name="`${q.id}-confirmation`"
      help="Campo de confirmación"
      :validation="`required|confirm:${q.id}`"
      validation-label="Confirmación"
    />
  </template>
</template>
