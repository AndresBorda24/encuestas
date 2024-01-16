<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { inputType } from '@/types';
import type { FormKitNode } from '@formkit/core';
import type { FormKitOptionsList } from "@formkit/inputs";
import IconTrash from '@/components/icons/icon-trash.vue';

const props = withDefaults(
  defineProps<{ questionType?: inputType }>(), { questionType: "select" }
);

const container = ref<HTMLElement | null>(null);
const addItem = async (node: FormKitNode) => {
  const data = node.value as FormKitOptionsList;
  await node.input(data.concat({ value: '', label: '', help: '' }));
  await nextTick();
  if (container.value == null) return;
  setTimeout(() =>
    (container.value?.querySelector('.option-item:last-of-type input') as HTMLElement)?.focus()
  , 10)
}
</script>

<template>
  <section class="border border-dashed p-6 rounded relative border-neutral-400">
    <legend class="absolute -top-3 left-4 rounded-lg px-5 border text-sm bg-white">
      Opciones de respuesta para tu pregunta.
    </legend>
    <p class=" pb-2 text-sm text-gray-500">
      Aquí puedes definir el listado de opciones que el usuario puede seleccionar. El texto de ayuda es opcional. Puedes agregar una nueva <span class="italic">opción</span> dando clic en el botón azul: <span class="font-bold">+ Nueva Opción</span>.
    </p>
    <p class="pb-2 text-xs text-gray-500">
      Importante: Las opciones aparecerán en el orden que se escriban.
    </p>

    <FormKit
      dynamic
      type="list"
      name="options"
      #default="{ items, node, value }"
    >
      <section
        ref="container"
        class="border p-1 max-h-[400px] overflow-auto rounded option-container bg-white"
      >
        <FormKit type="group"
          v-for="(item, index) in items"
          :key="item"
          :index="index"
          :name="`${option}-${index}`"
          #default="{ node: { children } }"
        >
          <div class="flex p-1 option-item items-start">
            <span class="px-3 text-sm">{{ index + 1 }}) </span>
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
                :type="questionType === 'select'
                  ? 'hidden'
                  : 'text'
                "
                placeholder="Texto de ayuda"
                name="help"
                value=""
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
              class="group px-1 text-sm rounded text-red-500"
            > <IconTrash class="h-5 w-5 group-hover:scale-95" /> </button>
          </div>
        </FormKit>
      </section>

      <button
        type="button"
        @click="addItem(node)"
        class="block border border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white p-1 rounded text-xs font-normal ms-auto mt-2"
      > + Nueva Opción </button>
    </FormKit>
  </section>
</template>

<style scoped>
  .option-container > .option-item:not(:first-of-type) {
    @apply border-t pt-3;
  }
</style>
