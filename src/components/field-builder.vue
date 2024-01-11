<script setup lang="ts">
import { input } from "@/inputs"
import { FormKit } from "@formkit/vue"
import ShortUniqueId from 'short-unique-id'
import { reset, getNode } from '@formkit/core'
import { useNProgress } from '@vueuse/integrations/useNProgress'
import type { inputType, question } from "@/types"

import OptionList from "@/components/options/option-list.vue"
import Validation from "@/components/options/validation.vue"

const emit = defineEmits<{
  (e: 'new-question', data: question): void
  (e: 'update-question', data: question): void
}>()

const t = ref<inputType>('text')
const { isLoading } = useNProgress()
const appUrl = import.meta.env.VITE_APP_URL;
const { randomUUID } = new ShortUniqueId({ length: 10 });
const initQuestion: question = {
  id: '',
  type: 'text',
  question: '',
  help: '',
  rules: [],
  options: [],
  placeholder: '',
  confirmation: false,
  default: ''
}

/**
 * Determina si el tipo de input seleccionado corresponde al listado
 * proporcionado
*/
const isInputType = (... types: inputType[]) => types.includes(t.value)

/**
 * Retorna un objeto en el que sus llaves son los tipos de input y su valor es
 * el "nombre" (human friendly)
*/
const inputTypes = computed(() =>
  Object.keys(input).reduce((p: {[key: string]: string}, c) => {
    p[c] = input[c as inputType].name
    return p
}, {}))

/** Envia el evento correcto dependiendo de la situacion */
const sendEvent = (data: question) => {
  if (data.id.length !== 10) {
    data.id = randomUUID();
    emit('new-question', data);
    return;
  }

  emit('update-question', data);
}

/** Funcion que se ejecuta al completar el formulario de creacion */
const submitHandler = (data: question) => {
  sendEvent(data);
  reset('field-builder');
  document.getElementById('field-builder-container')?.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/** Provee la opcion de modificar una pregunta ya registrada */
const setEditQuestion = async (data: question) => {
  isLoading.value = true;
  const form = getNode('field-builder')
  await form?.input(JSON.parse(JSON.stringify(data)))
  isLoading.value = false;
}

defineExpose({ setEditQuestion })
</script>

<template>
  <FormKit
    type="form"
    id="field-builder"
    autocomplete="off"
    :value="initQuestion"
    @submit="submitHandler"
    submit-label="Guardar !"
  >
    <!-- Seleccion tipo de pregunta -->
    <section class="grid grid-cols-2">
      <FormKit
        type="select"
        name="type"
        label="Tipo de Pregunta"
        validation="required"
        v-model="t"
        :options="inputTypes"
        help="Cada tipo de pregunta tiene su configuracion especifica :)"
      />
      <figure
        v-if="t"
        class="max-w-[300px] border self-center mx-auto rounded shadow-xl p-4"
      >
        <img
          class="object-cover w-full h-auto"
          :src="`${appUrl}${input[t].example}`"
        >
        <figcaption
          class="text-xs text-gray-400 text-center italic"
        >Ejemplo del tipo de pregunta</figcaption>
      </figure>
    </section>

    <FormKit
      type="text"
      label="Pregunta"
      name="question"
      outer-class="max-w-full"
      validation="required"
      help="Escribe la pregunta que desees"
    />

    <FormKit
      type="text"
      label="Ayuda"
      name="help"
      outer-class="max-w-full"
      help="Un texto corto que guie al encuestado. Esta es la ayuda!"
    />

    <div
      v-if="isInputType('text', 'textarea', 'number', 'password', 'tel')"
      class="grid grid-cols-2 gap-2"
    >
      <template v-if="isInputType('text', 'textarea', 'number', 'password', 'tel')">
        <FormKit
          type="text"
          label="Texto de 'Fondo'"
          name="placeholder"
          outer-class="max-w-full"
          placeholder="Este es el texto de 'Fondo'"
          help="Texto que se mostrará de fondo cuando el campo está vacío! Aplica a campos de texto."
        />
      </template>
      <!-- Campos que pueden tener un valor default -->
      <template v-if="isInputType('text', 'textarea', 'number')">
        <FormKit
          type="text"
          label="Valor por defecto"
          name="default"
          outer-class="max-w-full"
          help="Este valor se cargará siempre por defecto. Sin embargo, el usuario aún puede editarlo"
        />
      </template>
    </div>

    <!-- Seccion de Opciones -->
    <div v-if="isInputType('checkbox', 'select', 'radio')">
      <OptionList />
    </div>

    <!-- Campos con confirmacion -->
    <template v-if="isInputType('email', 'password', 'tel')">
      <FormKit
        type="checkbox"
        label="Requiere Confirmación"
        name="confirmation"
        outer-class="max-w-full"
        help="La respuesta debe ser confirmada por el usuario. Debe escribirla nuevamente."
      />
    </template>

    <!-- Reglas de validacion  -->
    <Validation :type="t" />
    <!-- End -->
  </FormKit>
</template>

<style>
  #field-builder > *::after {
    content: '';
    display: block;
    grid-column: 1 / -1;
    width: 100%;
    margin: 1.5rem 0;
    border-top: 1px solid #dfdfdf;
  }
</style>
