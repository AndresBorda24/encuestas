<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import FieldBuilder from '@/components/field-builder.vue'

const fields = ref([])
const createCharacter = (value: any) => console.log(value)
</script>
<template>
  <main class="grid grid-cols-2 h-screen">
    <section class="p-8 overflow-auto">
      <FieldBuilder />
    </section>
    <section class="p-8 w-full mx-auto bg-gray-50 border rounded">
      <FormKit
        type="form"
        @submit="createCharacter"
        submit-label="Crear Personaje"
        #default="{ value }"
      ></FormKit>
    </section>
  </main>
</template>
