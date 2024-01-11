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

  if (container.value == null) return;
  // Hacemos scroll hasta el final de la lista y focus
  setTimeout(() =>
    (container.value?.querySelector('.option-item:last-of-type input') as HTMLElement)?.focus()
  , 10)
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
    #default="{ items, node, value }"
  >
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
            <FormKit
              type="text"
              @input="(_v) => children[2].input(_v)"
              name="label"
              placeholder="Requerido"
              validation="required:trim"
              outer-class="!mb-1"
              label="Opción"
            />
            <FormKit
              type="text"
              placeholder="Texto de ayuda"
              name="help"
              wrapper-class="$reset mb-1 items-center"
              inner-class="!py-0.5 !px-2"
              input-class="text-xs !text-gray-500"
            />
            <FormKit type="hidden" name="value" />
          </div>
          <button
            type="button"
            title="Eliminar Opción"
            @click="() => node.input(value?.filter((_, i) => i !== index))"
            class="group self-center px-1 text-sm rounded text-red-500 hover:shadow-inner"
          > <IconTrash class="h-4 group-hover:scale-95" /> </button>
        </div>
      </FormKit>
    </section>

    <button
      type="button"
      @click="addItem(node)"
      class="block border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white p-1 rounded text-xs font-normal ms-auto mt-2"
    > + Nueva Opción </button>
  </FormKit>
</template>

<style scoped>
  .option-container > .option-item:not(:first-of-type) {
    @apply border-t pt-3;
  }
</style>
