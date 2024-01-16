<script setup lang="ts">
import { input, isInputType } from "@/inputs";
import { FormKit } from "@formkit/vue";
import type { inputType } from "@/types";

const questionType = ref('text')

/**
 * Retorna un objeto en el que sus llaves son los tipos de input y su valor es
 * el "nombre" (human friendly)
*/
const inputTypes = computed(() =>
  Object.keys(input).reduce((p: {[key: string]: string}, c) => {
    p[c] = input[c as inputType].name;
    return p;
}, {}));
</script>

<template>
  <section class="border border-dashed p-6 rounded relative grid gap-3 border-neutral-400">
    <legend class="absolute -top-3 left-4 rounded-lg px-5 border text-sm bg-white">Condiguración Básica</legend>

    <FormKit
      type="select"
      name="type"
      label="Tipo de Pregunta"
      validation="required"
      v-model="questionType"
      :options="inputTypes"
      outer-class="!mb-0"
      help="Cada tipo de pregunta tiene su configuracion especifica :)"
    />

    <template v-if="questionType === 'group'">
      <div class="p-4 text-xs text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <span class="font-medium">Las secciones te permiten <span class="font-bold">agrupar</span> preguntas. Además puedes establecer un título y una descripción que ayude al usuario.</span>
      </div>
    </template>

    <FormKit
      type="text"
      :label="questionType === 'group' ? 'Título' : 'Pregunta'"
      name="question"
      validation="required"
      outer-class="!mb-0"
      help="Escribe la pregunta que desees"
    />

    <FormKit
      type="textarea"
      :label="questionType === 'group' ? 'Descripción' : 'Ayuda'"
      name="help"
      outer-class="!mb-0"
      help="Un texto corto que guie al encuestado. Esta es la ayuda!"
    />

    <div
      v-if="isInputType(questionType, 'text', 'textarea', 'number', 'tel')"
      class="sm:grid grid-cols-2 gap-2"
    >
      <template v-if="isInputType(questionType, 'text', 'textarea', 'number', 'tel')">
        <FormKit
          type="text"
          label="Texto de 'Fondo'"
          name="placeholder"
          outer-class="!mb-0"
          placeholder="Este es el texto de 'Fondo'"
          help="Texto que se mostrará de fondo cuando el campo está vacío! Aplica a campos de texto."
        />
      </template>

      <template v-if="isInputType(questionType, 'text', 'textarea', 'number')">
        <FormKit
          type="text"
          label="Valor por defecto"
          name="default"
          outer-class="!mb-0"
          help="Este valor se cargará siempre por defecto. Sin embargo, el usuario aún puede editarlo"
        />
      </template>
    </div>
  </section>
</template>
