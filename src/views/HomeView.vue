<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import FieldBuilder from '@/components/field-builder.vue'
import type { question } from '@/types';

const fields = ref<question[]>([])
const createCharacter = (value: any) => console.log(value)
</script>
<template>
  <main class="grid grid-cols-2 h-screen">
    <section class="p-8 overflow-auto">
      <FieldBuilder @new-question="$data => fields.push($data)"/>
    </section>

    <FormKit
      type="form"
      @submit="createCharacter"
      submit-label="Crear Personaje"
      #default="{ value }"
    >
      <section class="p-8 w-full mx-auto bg-gray-50 border rounded">
        <template v-for="(f, index) in fields" :key="index" >
          <FormKit
            :type="f.type as string"
            :help="f.help"
            :placeholder="f.placeholder"
            :validation="f.rules"
            :options="f.options"
            :label="f.question"
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
        </template>
      </section>
    </FormKit>
  </main>
</template>
