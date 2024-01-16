<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import { useBuilderStore } from '@/stores/builder';
import { useQuestionsStore } from '@/stores/questions';
import { useSortable } from '@vueuse/integrations/useSortable';
// Comps ------>
import FieldBuilder from '@/components/field-builder.vue';
import QuestionPreviewList from '@/components/question-preview-list.vue';
import IconPlus  from '@/components/icons/icon-plus.vue';

const { newQuestion } = useBuilderStore();
const createCharacter = (value: any) => console.log(value);
const { questionsList } = storeToRefs( useQuestionsStore() );

const getPreviewImageUrl = (file) => URL.createObjectURL(file);
</script>

<template>
  <main class="max-h-screen relative">
    <FieldBuilder ref="fieldBuilder" />

    <FormKit
      type="form"
      @submit="createCharacter"
      form-class="overflow-auto"
      submit-label="Guardar"
    >
      <section
        ref="container"
        id="form-questions-container"
        class="p-3 sm:p-4 md:p-6 lg:8 grid gap-2 max-w-lg lg:max-w-xl mx-auto mt-3 bg-gray-50 border rounded overflow-auto"
      >
        <span class="text-lg text-teal-500 font-bold">Datos Principales:</span>

        <FormKit
          type="group"
          name="cabecera"
          #="{ value: cabValue }"
        >
          <div class="rounded p-1 border-b">
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

            <FormKit
              type="file"
              label="Portada"
              help="Procura que la imagen no sea muy grande. Aconsejamos que sea rectangular.👍"
              accept=".png,.jpg,.jpeg"
              name="cover"
            />
            <img
              v-if="cabValue.cover?.length > 0"
              class="max-h-[500px] mx-auto rounded shadow-lg mb-4"
              :src="getPreviewImageUrl(cabValue.cover[0].file)"
            >
          </div>
        </FormKit>

        <span class="text-lg text-teal-500 font-bold">Preguntas:</span>

        <FormKit type="group" name="question" #="{ value }">
          <QuestionPreviewList :value="value" :questions="questionsList"/>
        </FormKit>
      </section>
    </FormKit>

    <button
      type="button"
      @click="newQuestion(undefined)"
      class="sticky bottom-3 ml-auto mr-4 shadow-lg flex items-center gap-1 text-white bg-green-500 text-sm px-3 py-2 rounded hover:bg-green-600"
    > Agregar Pregunta <IconPlus class="w-4 inline" /> </button>
  </main>
</template>
