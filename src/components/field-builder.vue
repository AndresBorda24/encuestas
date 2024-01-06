<script setup lang="ts">
import { FormKit } from "@formkit/vue"
import OptionList from "@/components/options/option-list.vue"
import Validation from "@/components/options/validation.vue"

import type { inputType } from "@/types"

const input: { [k in inputType] : { name: string, example: any } } = {
  radio: {
    name: "Selección Única",
    example: "examples/radio.PNG"
  },
  checkbox: {
    name: "Selección Múltiple",
    example: "examples/checkbox.PNG"
  },
  text: {
    name: "Texto Corto",
    example: "examples/text.PNG"
  },
  date: {
    name: "Fecha",
    example: "examples/date.PNG"
  },
  color: {
    name: "Selección de Color",
    example: "examples/color.PNG"
  },
  email: {
    name: "Correo Electrónico",
    example: "examples/email.PNG"
  },
  number: {
    name: "Número",
    example: "examples/number.PNG"
  },
  password: {
    name: "Contraseña",
    example: "examples/password.PNG"
  },
  range: {
    name: "Rango",
    example: "examples/range.PNG"
  },
  select: {
    name: "Selección",
    example: "examples/select.PNG"
  },
  tel: {
    name: "Teléfono",
    example: "examples/tel.PNG"
  },
  textarea: {
    name: "Texto Largo",
    example: "examples/textarea.PNG"
  }
}

const t = ref()
const appUrl = import.meta.env.VITE_APP_URL;
const inputTypes = computed(() =>
  Object.keys(input).reduce((p: {[key: string]: string}, c) => {
    p[c] = input[c as inputType].name
    return p
}, {}))

const submitHandler = (data: any) => {
  console.log(data)
}
</script>
<template>
  <FormKit
    type="form"
    @submit="submitHandler"
    submit-label="Agregar Pregunta"
  >
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
    <hr class="my-4">
    <FormKit
      type="text"
      label="Texto de 'Fondo'"
      name="placeholder"
      outer-class="max-w-full"
      placeholder="Este es el texto de 'Fondo'"
      help="Texto que se mostrará de fondo cuando el campo está vacío! Aplica a campos de texto."
    />
    <hr class="my-4">
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
    <OptionList />
    <hr class="my-4">
    <FormKit
      type="text"
      label="Valor por defecto"
      name="default"
      outer-class="max-w-full"
      help="Este valor se cargará siempre por defecto. Sin embargo, el usuario aún puede editarlo"
    />
    <hr class="my-4">
    <FormKit
      type="checkbox"
      label="Requiere Confirmación"
      name="confirmation"
      outer-class="max-w-full"
      help="La respuesta debe ser confirmada por el usuario. Debe escribirla nuevamente."
    />
    <hr class="my-4">
    <Validation />
    <hr class="my-4">
  </FormKit>
</template>
