<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { question } from "@/types"

const props = defineProps<{ question: question }>()
</script>

<template>
  <FormKit
    :type="question.type"
    :help="question.help"
    :placeholder="question.placeholder"
    :validation="question.rules"
    :options="question.options"
    :label="question.question"
    :value="question.default"
    :name="question.id"
  ></FormKit>
  <template v-if="question.confirmation">
    <FormKit
      :type="question.type"
      :placeholder="question.placeholder"
      :label="`${question.question} - Confirmación`"
      :name="`${question.id}-confirmation`"
      help="Campo de confirmación"
      :validation="`required|confirm:${question.id}`"
      validation-label="Confirmación"
    />
  </template>
</template>
