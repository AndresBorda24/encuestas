<script setup lang="ts">
import { input } from "@/inputs"
import { FormKit } from "@formkit/vue"
import OptionList from "@/components/options/option-list.vue"
import Validation from "@/components/options/validation.vue"
import type { inputType } from "@/types"

const t = ref<inputType>('text')
const appUrl = import.meta.env.VITE_APP_URL;

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

/**
 * Funcion que se ejecuta al completar el formulario de creacion
*/
const submitHandler = (data: any) => {
  console.log(Object.values(data.rules))
}
</script>

<template>
  <FormKit
    type="form"
    @submit="submitHandler"
    submit-label="Agregar Pregunta"
  >
    <!-- Seleccion tipo de pregunta -->
    <section class="grid grid-cols-2">
      <FormKit
        type="radio"
        name="type"
        label="Tipo de Pregunta"
        validation="required"
        v-model="t"
        :options="inputTypes"
        help="Cada tipo de pregunta tiene su configuracion especifica :)"
      />
      <figure
        v-if="t"
        class="max-w-[300px] border self-center rounded shadow-xl p-4"
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
    <hr class="my-4">

    <FormKit
      type="text"
      label="Pregunta"
      name="question"
      outer-class="max-w-full"
      validation="required"
      help="Escribe la pregunta que desees"
    />
    <hr class="my-4">
    <FormKit
      type="text"
      label="Ayuda"
      name="help"
      outer-class="max-w-full"
      help="Un texto corto que guie al encuestado. Esta es la ayuda!"
    />

    <template v-if="isInputType('text', 'textarea', 'number', 'password', 'tel')">
      <hr class="my-4">
      <FormKit
        type="text"
        label="Texto de 'Fondo'"
        name="placeholder"
        outer-class="max-w-full"
        placeholder="Este es el texto de 'Fondo'"
        help="Texto que se mostrará de fondo cuando el campo está vacío! Aplica a campos de texto."
      />
    </template>
    <!-- Seccion de Opciones -->
    <template v-if="isInputType('checkbox', 'select', 'radio')">
      <hr class="my-4">
      <OptionList />
    </template>

    <!-- Campos que pueden tener un valor default -->
    <template v-if="isInputType('text', 'textarea', 'number')">
      <hr class="my-4">
      <FormKit
        type="text"
        label="Valor por defecto"
        name="default"
        outer-class="max-w-full"
        help="Este valor se cargará siempre por defecto. Sin embargo, el usuario aún puede editarlo"
      />
    </template>

    <!-- Campos con confirmacion -->
    <template v-if="isInputType('email', 'password', 'tel')">
      <hr class="my-4">
      <FormKit
        type="checkbox"
        label="Requiere Confirmación"
        name="confirmation"
        outer-class="max-w-full"
        help="La respuesta debe ser confirmada por el usuario. Debe escribirla nuevamente."
      />
    </template>

    <!-- Reglas de validacion  -->
    <hr class="my-4">
    <Validation :type="t" />

    <!-- End -->
    <hr class="my-4">
  </FormKit>
</template>
