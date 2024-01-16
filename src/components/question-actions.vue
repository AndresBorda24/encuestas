<script setup lang="ts">
import { getNode } from '@formkit/core';
import { useBuilderStore } from '@/stores/builder';
import { useQuestionsStore } from '@/stores/questions';
import type { question } from '@/types';
// Icons ------------->
import IconEdit  from '@/components/icons/icon-edit.vue';
import IconCopy  from '@/components/icons/icon-copy.vue';
import IconTrash from '@/components/icons/icon-trash.vue';
import IconMove  from '@/components/icons/icon-move.vue';
import IconPlus  from '@/components/icons/icon-plus.vue';

const props = defineProps<{ question: question }>();
const { deleteQuestion } = useQuestionsStore();
const { setQuestion, newQuestion } = useBuilderStore();
</script>

<template>
  <div class="absolute w-full hidden group-hover:flex gap-2 top-0 right-0 pt-1 pr-1">
    <IconMove class="move-handle h-4 block mr-auto p-0.5 cursor-all-scroll text-teal-500" />

    <button
      v-if="question.type == 'group'"
      type="button"
      class="flex items-center gap-1 text-white bg-green-500 text-xs px-2 py-0 rounded hover:bg-green-600"
      @click="newQuestion(question.id)"
    > Agregar Pregunta <IconPlus class="w-4 inline" /> </button>

    <button
      type="button"
      class="flex items-center gap-1 text-white bg-teal-500 text-xs px-2 py-0 rounded hover:bg-teal-600"
      @click="setQuestion(question, false)"
    > Editar <IconEdit class="w-4 inline" /> </button>

    <button
      type="button"
      class="flex items-center gap-1 text-white bg-sky-500 text-xs px-2 py-0 rounded hover:bg-sky-600"
      @click="setQuestion(question, true)"
    > Copiar <IconCopy class="w-4 inline" /> </button>

    <details class="relative">
      <summary
        role="button"
        class="flex items-center gap-1 text-white bg-red-500 text-xs px-2 py-0 rounded select-none hover:bg-red-600"
      > Borrar <IconTrash class="w-4 inline" /> </summary>
      <div class="absolute rounded shadow top-full py-3 px-5 right-0 bg-red-200 rouned mt-0.5 z-10">
        <button
          type="button"
          class="text-red-700 underline text-xs block mx-auto"
          @click="deleteQuestion(question.id, question.group)"
        >Confirmar</button>
      </div>
    </details>
  </div>
</template>
