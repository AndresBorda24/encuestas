<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import FieldBuilder from '@/components/field-builder.vue'
import type { question } from '@/types';

import IconEdit from '@/components/icons/icon-edit.vue'
import IconCopy from '@/components/icons/icon-copy.vue'
import IconTrash from '@/components/icons/icon-trash.vue'

const fields = ref<question[]>([])
const fieldBuilder = ref<InstanceType<typeof FieldBuilder>>()
const createCharacter = (value: any) => console.log(value)

/**
 * Para que se pueda 'duplicar' se debe crear una copia, asi, las modificaciones
 * no alterarán al original
*/
const copyQuestion = (data: question) => {
  const dataCopy = JSON.parse(JSON.stringify(data));
  dataCopy.id = "";
  fieldBuilder.value?.setEditQuestion(dataCopy);
}

const updateQuestion = (data: question) => {
  const id = fields.value.findIndex(f => f.id === data.id);
  if (id === -1) return;
  fields.value[ id ] = data;
}
</script>
<template>
  <main class="grid grid-cols-2 h-screen">
    <section class="p-8 overflow-auto relative" id="field-builder-container">
      <FieldBuilder
        ref="fieldBuilder"
        @new-question="$data => fields.push($data)"
        @update-question="$data => updateQuestion($data)"
      />
    </section>

    <FormKit
      type="form"
      @submit="createCharacter"
      form-class="overflow-auto"
      submit-label="Guardar"
    >
      <section class="p-6 grid gap-2 w-full mx-auto bg-gray-50 border rounded overflow-auto">
        <div
          v-for="f in fields" :key="f.id"
          class="group relative border border-gray-50 rounded p-4 border-dashed  hover:border-teal-500"
        >
          <div class="absolute hidden group-hover:flex gap-2 top-0 right-0 pt-1 pr-1">
            <button
              class="flex items-center gap-1 text-white bg-teal-500 text-xs px-2 py-0 rounded hover:bg-teal-600"
              type="button"
              @click="() => fieldBuilder?.setEditQuestion(f)"
            > Editar <IconEdit class="w-4 inline" /> </button>

            <button
              class="flex items-center gap-1 text-white bg-sky-500 text-xs px-2 py-0 rounded hover:bg-sky-600"
              type="button"
              @click="copyQuestion(f)"
            > Copiar <IconCopy class="w-4 inline" /> </button>

            <details class="relative">
              <summary role="button" class="flex items-center gap-1 text-white bg-red-500 text-xs px-2 py-0 rounded select-none hover:bg-red-600">
                Borrar <IconTrash class="w-4 inline" />
              </summary>
              <div class="absolute rounded shadow top-full py-3 px-5 right-0 bg-red-200 rouned  mt-0.5">
                <button
                  @click="fields = fields.filter(_ => _.id !== f.id)"
                  class="text-red-700 underline text-xs block mx-auto"
                >Confirmar</button>
              </div>
            </details>
          </div>

          <FormKit
            :type="f.type"
            :help="f.help"
            :placeholder="f.placeholder"
            :validation="f.rules"
            :options="f.options"
            :label="f.question"
            :value="f.default"
            :name="f.id"
          />
          <template v-if="f.confirmation">
            <FormKit
              :type="f.type"
              :placeholder="f.placeholder"
              :label="`${f.question} - Confirmación`"
              :name="`${f.id}-confirmation`"
              help="Campo de confirmación"
              :validation="`required|confirm:${f.id}`"
              validation-label="Confirmación"
            />
          </template>
        </div>
      </section>
    </FormKit>
  </main>
</template>
