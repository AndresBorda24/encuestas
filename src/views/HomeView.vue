<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import FieldBuilder from '@/components/field-builder.vue'
import type { question } from '@/types';

const fields = ref<question[]>([])
const fieldBuilder = ref<InstanceType<typeof FieldBuilder>>()
const createCharacter = (value: any) => console.log(value)


const updateQuestion = (data: question) => {
  const id = fields.value.findIndex(f => f.id === data.id);
  if (id === -1) return;

  console.log(fields.value[ id ], data)
  fields.value[ id ] = data;
}
</script>
<template>
  <main class="grid grid-cols-2 h-screen">
    <section class="p-8 overflow-auto" id="field-builder-container">
      <FieldBuilder
        ref="fieldBuilder"
        @new-question="$data => fields.push($data)"
        @update-question="$data => updateQuestion($data)"
      />
    </section>

    <FormKit
      type="form"
      @submit="createCharacter"
      submit-label="Crear Personaje"
    >
      <section class="p-6 grid gap-2 w-full mx-auto bg-gray-50 border rounded overflow-auto">
        <div
          v-for="f in fields" :key="f.id"
          class="group relative border border-gray-50 rounded p-4 border-dashed  hover:border-teal-500"
        >
          <button
            class="hidden absolute top-1 right-1 bg-teal-500 text-xs px-2 py-1 rounded group-hover:block"
            type="button"
            @click="() => fieldBuilder?.setEditQuestion(f)"
          > Edit </button>

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
              :validation="`required|confirm:q-${f.id}`"
              validation-label="Confirmación"
            />
          </template>
        </div>
      </section>
    </FormKit>
  </main>
</template>
