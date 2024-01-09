<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import FieldBuilder from '@/components/field-builder.vue'
import type { question } from '@/types';

const fields = ref<question[]>([])
const fieldBuilder = ref<InstanceType<typeof FieldBuilder>>()
const createCharacter = (value: any) => console.log(value)
</script>
<template>
  <main class="grid grid-cols-2 h-screen">
    <section class="p-8 overflow-auto" id="field-builder-container">
      <FieldBuilder
        ref="fieldBuilder"
        @new-question="$data => fields.push($data)"
      />
    </section>

    <FormKit
      type="form"
      @submit="createCharacter"
      submit-label="Crear Personaje"
      #default="{ value }"
    >
      <section class="p-6 grid gap-2 w-full mx-auto bg-gray-50 border rounded overflow-auto">
        <div
          v-for="(f, index) in fields" :key="index"
          class="group relative border border-gray-50 rounded p-4 border-dashed  hover:border-teal-500"
        >
          <button
            class="hidden absolute top-1 right-1 bg-teal-500 text-xs px-2 py-1 rounded group-hover:block"
            type="button"
            @click="() => fieldBuilder?.setEditQuestion(f)"
          > Edit </button>

          <FormKit
            :type="f.type as string"
            :help="f.help"
            :placeholder="f.placeholder"
            :validation="f.rules"
            :options="f.options"
            :label="f.question"
            :value="f.default"
            :name="`q-${index}`"
          />
          <template v-if="f.confirmation">
            <FormKit
              :type="f.type as string"
              :placeholder="f.placeholder"
              :label="`${f.question} - Confirmación`"
              :name="`q-${index}-confirmation`"
              help="Campo de confirmación"
              :validation="`required|confirm:q-${index}`"
              validation-label="Confirmación"
            />
          </template>
        </div>
      </section>
    </FormKit>
  </main>
</template>
