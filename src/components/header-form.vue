<script setup lang="ts">
import { FormKit } from '@formkit/vue';
const colors = {
  'blue': 'bg-blue-600 bg-blue-800 text-blue-200 text-blue-100',
  'teal': 'bg-teal-600 bg-teal-800 text-teal-200 text-teal-100',
  'indigo': 'bg-indigo-600 bg-indigo-800 text-indigo-200 text-indigo-100'
};
const color = ref('blue');

const onSubmit = async (data: any) => {
  data.color = color.value;
  console.log(data);
}
</script>

<template>
<article :class="`min-h-[60vh] bg-${color}-600 relative flex flex-col text-neutral-200 transition-colors duration-300`">
  <div class="w-full flex justify-between p-4 mb-4">
    <img
      src="https://asotrauma.com.co/wp-content/uploads/2021/09/Asotrauma-logo-w.svg"
      alt="Logo-Asotrauma Blanco"
      class="h-6"
    >

    <div class="flex gap-3">
      <label
        v-for="(c, key) in colors" :key="key"
        :for="`$color-${key}`"
        :class="[`bg-${key}-600 border border-white h-6 w-6 ratio-1 rounded-full cursor-pointer`, {
          'outline-1 outline-white outline-offset-2 outline': (key == color)
        }]"
      >
        <input
          type="radio"
          v-model="color"
          :value="key"
          name="encuesta_color"
          :id="`$color-${key}`"
          class="appearence-none h-0"
        >
      </label>
    </div>
  </div>
  <div class="max-w-3xl mx-auto">
    <FormKit
      @submit="onSubmit"
      type="form"
      submit-label="Guardar"
      :config="{
        classes: {
          label: {
            $reset: true,
            'text-white font-bold text-sm': true
          },
          message: {
            $reset: true,
            'text-black font-bold text-xs bg-red-200 p-1 rounded': true
          },
        }
      }"
      :submit-attrs="{
        inputClass: `$reset bg-${color}-800 text-${color}-200 px-3 py-2 rounded hover:bg-${color}-700 hover:text-${color}-100 hover:scale-95`,
        wrapperClass: `border-t pt-3 mt-8 border-${color}-300`,
        helpClass: '$reset text-neutral-200/70 text-xs',
        help: 'Para guardar los cambios realizados en la Cabecera pulsa Guardar'
      }"
    >
      <FormKit
        type="text"
        placeholder="Escribe aquí el titulo de la encuesta"
        label="Título de la encuesta"
        validation="required|length:10,200"
        :classes="{
          inner: {
            $reset: true,
            'px-2 py-1 border-b border-dashed border-neutral-100 text-neutral-100 text-3xl hover:border-solid focus-within:border-solid w-full': true
          },
          input: {
            $reset: true,
            'bg-transparent outline-none focus:outline-none w-full max-w-[90vw] placeholder:text-slate-100/30': true
          }
        }"
        name="title"
      />

      <FormKit
        type="textarea"
        rows="8"
        validation="required|length:10,800"
        label="Descripción de la encuesta"
        placeholder="Una presentación a la encuesta para contextualizar al usuario"
        :classes="{
          inner: {
            $reset: true,
            'px-2 py-1 border border-dashed rounded border-neutral-100 text-neutral-100 text-md hover:border-solid focus-within:border-solid w-full mb-1': true
          },
          input: {
            $reset: true,
            'bg-transparent outline-none focus:outline-none w-full max-w-[90vw] placeholder:text-slate-100/30': true
          }
        }"
        name="description"
      />
      <FormKit
        type="checkbox"
        label="Solicitar Inicio de Sesión de intranet"
        help="Los usuarios deberán iniciar sesión para poder responder la encuesta. Activa esta opción si quieres que solo la responda el personal de la Clínica."
        name="require_intranet"
        :value="false"
        :classes="{
          help: {
            $reset: true,
            'text-neutral-200/70 text-xs': true
          }
        }"
      />
    </FormKit>
  </div>
</article>
</template>
