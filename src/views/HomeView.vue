<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import { useBuilderStore } from '@/stores/builder';
import { useSortable } from '@vueuse/integrations/useSortable';
// Comps ------>
import FieldBuilder from '@/components/field-builder.vue';
import QuestionPreviewList from '@/components/question-preview-list.vue';
import IconPlus  from '@/components/icons/icon-plus.vue';

const createCharacter = (value: any) => console.log(value);
const { newQuestion } = useBuilderStore();
</script>

<template>
  <main class="max-h-screen relative overflow-auto">
    <section class="hidden p-8 overflow-auto relative" id="field-builder-container">
      <FieldBuilder ref="fieldBuilder" />
    </section>

    <FormKit
      type="form"
      @submit="createCharacter"
      form-class="overflow-auto"
      submit-label="Guardar"
    >
      <section
        ref="container"
        id="form-questions-container"
        class="p-6 grid gap-2 max-w-lg mx-auto bg-gray-50 border rounded overflow-auto"
      >
        <span class="text-lg text-teal-500 font-bold">Datos Principales:</span>

        <div class="rounded p-4 border-b">
          <FormKit
            type="text"
            label="Título"
            help="Este va a ser el titulo principal de la encuesta"
            name="title"
            validation="required"
          />
          <FormKit
            type="textarea"
            label="Presentación"
            help="Texto que ayude a dar contexto a la encuesta."
            name="description"
          />
        </div>

        <span class="text-lg text-teal-500 font-bold">Preguntas:</span>

        <FormKit type="group" name="question" #="{ value }">
          <QuestionPreviewList :value="value"/>
        </FormKit>
      </section>
    </FormKit>

    <button
      type="button"
      @click="newQuestion"
      class="sticky bottom-3 ml-auto mr-4 shadow-lg flex items-center gap-1 text-white bg-green-500 text-sm px-3 py-2 rounded hover:bg-green-600"
    > Agregar Pregunta <IconPlus class="w-4 inline" /> </button>
  </main>
</template>
