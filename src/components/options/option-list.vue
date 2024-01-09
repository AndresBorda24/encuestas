<script setup lang="ts">
import { FormKit } from '@formkit/vue'
import IconTrash from '@/components/icons/icon-trash.vue'
import type { FormKitNode } from '@formkit/core'
import type { FormKitOptionsList } from "@formkit/inputs"

const container = ref<HTMLElement | null>(null)

const addItem = async (node: FormKitNode) => {
  const data = node.value as FormKitOptionsList;

  await node.input(data.concat({ value: '', label: '', help: '' }));
  await nextTick();

  if (!container.value) return;
  // Hacemos scroll hasta el final de la lista y focus
  container.value.scrollTop = (node.children.length * 95);
  (container.value.querySelector('.option-item:last-of-type input') as HTMLElement)?.focus()
}
</script>

<template>
  <span class="font-bold text-sm text-gray-600">
    Opciones de respuesta para tu pregunta.
  </span>
  <p class="mt-4 pb-2 text-sm text-gray-500">
    Aquí puedes definir el listado de opciones que el usuario puede seleccionar. El texto de ayuda es opcional. Puedes agregar una nueva <span class="italic">opción</span> dando clic en el botón azul: <span class="font-bold">+ Nueva Opción</span>.
  </p>
  <p class="pb-2 text-sm text-gray-500">
    Las opciones aparecerán en el orden que se escriban. Importante: El texto de ayuda solamente aparecerá en los campos que aplique: Seleccción Unica y Selección Multiple
  </p>

  <FormKit
    dynamic
    type="list"
    name="options"
    :value="[{ value: '', label: '', help: '' }]"
    #default="{ items, node, value }"
  >
   <button
      type="button"
      @click="addItem(node)"
      class="block border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white p-1 rounded text-xs font-normal ms-auto mb-2"
    > + Nueva Opción </button>
    <section
      ref="container"
      class="border p-4 max-h-[400px] overflow-auto rounded bg-gray-50 option-container"
    >
      <FormKit type="group"
        v-for="(item, index) in items"
        :key="item"
        :index="index"
        #default="{ node: { children } }"
      >
        <div class="flex p-1 option-item items-start">
          <span class="p-3">{{ index + 1 }}) </span>
          <div class="flex flex-1 flex-col gap-0">
            <FormKit type="hidden" name="value" />
            <FormKit
              type="text"
              @input="(_v) => children[0].input(_v)"
              name="label"
              placeholder="Requerido"
              validation="required:trim"
              wrapper-class="$reset mb-1 grid grid-cols-[2fr_10fr] gap-2 items-center"
              label="Opción"
            />
            <FormKit
              label="Ayuda"
              type="text"
              placeholder="Opcional"
              name="help"
              wrapper-class="$reset mb-1 grid grid-cols-[2fr_10fr] gap-2 items-center"
            />
          </div>
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
