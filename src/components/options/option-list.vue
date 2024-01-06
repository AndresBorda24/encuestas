<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import IconTrash from '@/components/icons/icon-trash.vue'
import type { FormKitNode } from '@formkit/core'

const container = ref<HTMLElement | null>(null)
const addItem = async (node: FormKitNode) => {
  const data = node.value as any[]
  const x = { title: '', help: '' }
  await node.input(data.concat(x))
  await nextTick()
  if (!container.value) return
  container.value.scrollTop = (node.children.length * 95)
}
</script>

<template>
  <FormKit
    dynamic
    type="list"
    name="options"
    :value="[{ title: '', help: '' }]"
    #default="{ items, node, value }"
  >
    <p class="mt-4 mb-2 pb-2 font-bold text-sm text-gray-600">
      Opciones de respuesta para tu pregunta.
       <button
        type="button"
        @click="addItem(node)"
        class="border border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white p-1 rounded text-xs float-right font-normal"
      > + Nueva Opción </button>
    </p>

    <section
      ref="container"
      class="border p-4 max-h-[400px] overflow-auto rounded bg-gray-50 option-container"
    >
      <FormKit type="group"
        v-for="(item, index) in items"
        :key="item"
        outer-class="border"
        :index="index"
      >
        <div class="flex gap-3 option-item">
          <FormKit
            type="text"
            name="title"
            validation="required"
            label="Opcion"
          />

          <FormKit
            label="Texto de ayuda"
            type="text"
            name="help"
            help="Este texto se mostrará solamente si aplica."
          />

          <button
            type="button"
            title="Eliminar Opción"
            @click="() => node.input(value?.filter((_, i) => i !== index))"
            class="group self-center px-2 text-sm rounded text-red-500 hover:shadow-inner"
          > <IconTrash class="h-6 group-hover:scale-95" /> </button>
        </div>
      </FormKit>
    </section>
  </FormKit>
</template>

<style scoped>
  .option-container > .option-item:not(:first-of-type) {
    @apply border-t pt-3;
  }
</style>
