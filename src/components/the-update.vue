<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import { useBuilderStore } from '@/stores/builder';
import { useQuestionsStore } from '@/stores/questions';
// Comps ------>
import FieldBuilder from '@/components/field-builder.vue';
import QuestionPreviewList from '@/components/question-preview-list.vue';
import IconPlus  from '@/components/icons/icon-plus.vue';

const { newQuestion } = useBuilderStore();
const encuestaShowResults = (value: any) => console.log(value);
const { questionsList } = storeToRefs( useQuestionsStore() );
</script>
<template>
  <h3 class="text-xl font-bold text-center mb-8">Listado de Preguntas</h3>
  <p class="text-pretty text-neutral-700">Para crear una pregunta pulsa en el botón verde <q class="font-bold">Agregar Pregunta +</q>. Aquí se verá una previsualización de la encuesta.</p>
  <FieldBuilder />
  <FormKit
    type="form"
    @submit="encuestaShowResults"
    form-class="overflow-auto"
    submit-label="Guardar"
  >
    <FormKit type="group" name="question" #="{ value }">
      <QuestionPreviewList :value="value" :questions="questionsList"/>
    </FormKit>
  </FormKit>

  <button
    type="button"
    @click="newQuestion(undefined)"
    class="sticky bottom-3 ml-auto mr-4 shadow-lg flex items-center gap-1 text-white bg-green-500 text-sm px-3 py-2 rounded hover:bg-green-600"
  > Agregar Pregunta <IconPlus class="w-4 inline" /> </button>
</template>
