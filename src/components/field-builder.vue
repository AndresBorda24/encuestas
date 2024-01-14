<script setup lang="ts">
import { input } from "@/inputs"
import { reset } from '@formkit/core'
import { FormKit } from "@formkit/vue"
import ShortUniqueId from 'short-unique-id'
import { useBuilderStore } from '@/stores/builder'
import { useQuestionsStore } from '@/stores/questions'
import type { inputType, question } from "@/types"

import IconClose  from "@/components/icons/icon-close.vue"
import OptionList from "@/components/options/option-list.vue"
import Validation from "@/components/options/validation.vue"

const t = ref<inputType>('text')
const appUrl = import.meta.env.VITE_APP_URL;
const { visible, baseQuestion } = storeToRefs( useBuilderStore() );
const { addQuestion, updateQuestion } = useQuestionsStore();
const { randomUUID } = new ShortUniqueId({ length: 10 });

/** Determina si el tipo de input seleccionado corresponde al listado proporcionado */
const isInputType = (... types: inputType[]) => types.includes(t.value);

/**
 * Retorna un objeto en el que sus llaves son los tipos de input y su valor es
 * el "nombre" (human friendly)
*/
const inputTypes = computed(() =>
  Object.keys(input).reduce((p: {[key: string]: string}, c) => {
    p[c] = input[c as inputType].name
    return p
}, {}));

/** Actualiza o inserta una nueva pregunta */
const updateOrCreateQuestion = (data: question) => {
  if (data.id.length !== 10) {
    data.id = randomUUID();
    addQuestion(data)
    return;
  }
  updateQuestion(data);
}

/** Funcion que se ejecuta al completar el formulario de creacion */
const submitHandler = (data: question) => {
  updateOrCreateQuestion(data);
  reset('field-builder');
}

const closeModal = () => {
  visible.value = false;
  reset('field-builder');
}
</script>

<template>
  <Teleport to="body">
    <div
      v-show="visible"
      class="bg-black/60 p-3 flex h-screen w-full fixed top-0 left-0 overflow-auto"
    >
      <div class="relative m-auto p-8 rounded-md bg-white max-w-[600px]">
        <button
          @click="closeModal"
          class="rounded-full hover:bg-black/10 p-2 absolute top-1 right-1"
        >
          <IconClose class="h-4 w-4" />
        </button>
        <FormKit
          type="form"
          id="field-builder"
          autocomplete="off"
          :value="baseQuestion"
          @submit="submitHandler"
          form-class="grid gap-3"
          submit-label="Guardar !"
        >
          <!-- Seleccion tipo de pregunta -->
          <section class="sm:grid grid-cols-2 gap-2">
            <figure
              v-if="t"
              class="order-2 mb-4 sm:mb-0 max-w-[300px] border self-center mx-auto rounded shadow-lg p-4"
            >
              <img
                class="object-cover w-full h-auto"
                :src="`${appUrl}${input[t].example}`"
              >
              <figcaption
                class="text-xs text-gray-400 text-center italic"
              >Ejemplo del tipo de pregunta</figcaption>
            </figure>

            <FormKit
              type="select"
              name="type"
              label="Tipo de Pregunta"
              validation="required"
              v-model="t"
              :options="inputTypes"
              outer-class="order-1"
              help="Cada tipo de pregunta tiene su configuracion especifica :)"
            />
          </section>

          <template v-if="t == 'group'">
            <p>Las secciones te permiten <span class="font-bold">agrupar</span> preguntas. Además puedes establecer un título y una descripción que ayude al usuario.</p>

            <FormKit
              type="text"
              label="Título"
              help="Este va a ser el titulo principal de la encuesta"
              name="question"
              validation="required"
            />
            <FormKit
              type="textarea"
              label="Presentación"
              help="Texto que ayude a dar contexto a la encuesta."
              name="help"
            />
            <FormKit
              type="list"
              :value="[]"
              name="questions"
            />
          </template>

          <template v-else>
            <FormKit
              type="text"
              label="Pregunta"
              name="question"
              validation="required"
              outer-class="mb-0"
              help="Escribe la pregunta que desees"
            />

            <FormKit
              type="text"
              label="Ayuda"
              name="help"
              outer-class="mb-0"
              help="Un texto corto que guie al encuestado. Esta es la ayuda!"
            />

            <div
              v-if="isInputType('text', 'textarea', 'number', 'password', 'tel')"
              class="sm:grid grid-cols-2 gap-2"
            >
              <template v-if="isInputType('text', 'textarea', 'number', 'password', 'tel')">
                <FormKit
                  type="text"
                  label="Texto de 'Fondo'"
                  name="placeholder"
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
          </template>
        </FormKit>
      </div>
    </div>
  </Teleport>
</template>

<style>
  #lfield-builder > div::after,
  #lfield-builder > section::after {
    content: '';
    display: block;
    grid-column: 1 / -1;
    width: 100%;
    margin: 1.5rem 0;
    border-top: 1px solid #dfdfdf;
  }
</style>
