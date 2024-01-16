<script setup lang="ts">
import { reset } from '@formkit/core'
import { FormKit } from "@formkit/vue"
import ShortUniqueId from 'short-unique-id'
import { useBuilderStore } from '@/stores/builder'
import { useQuestionsStore } from '@/stores/questions'
import type { question, inputType } from "@/types"

import IconClose  from "@/components/icons/icon-close.vue"
import Basic from "@/components/builder-steps/basic.vue"
import Options from "@/components/builder-steps/options.vue"
import Validation from "@/components/builder-steps/validation.vue"

const { groups } = storeToRefs(useQuestionsStore());
const { addQuestion, updateQuestion } = useQuestionsStore();
const { visible, baseQuestion } = storeToRefs( useBuilderStore() );
const { randomUUID } = new ShortUniqueId({ length: 10 });

/** Actualiza o inserta una nueva pregunta */
const updateOrCreateQuestion = (data: question) => {
  if (! Boolean(data.id) || data.id.length !== 10) {
    data.id = randomUUID();
    addQuestion(data);
    return;
  }
  updateQuestion(data);
}

/** Funcion que se ejecuta al completar el formulario de creacion */
const submitHandler = (data: question) => {
  data.group = data.group_;
  delete data.group_;
  updateOrCreateQuestion(data);
  closeModal();
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
      class="bg-black/60 flex h-screen w-full fixed top-0 left-0 overflow-auto"
    >
      <div class="relative px-4 pb-8 overflow-auto bg-white w-full max-w-[550px]">
        <FormKit
          type="form"
          id="field-builder"
          autocomplete="off"
          :value="baseQuestion"
          @submit="submitHandler"
          form-class="grid gap-12"
          submit-label="Guardar !"
          :config="{ validationVisibility: 'submit' }"
          #="{ value }"
        >
          <div class="sticky flex -mb-4  items-start top-0 z-10 border-b bg-white p-1">
            <span
              :class="[' text-xs font-medium me-2 px-2.5 py-0.5 rounded mt-2', {
                'bg-yellow-200 text-yellow-800': value && value.id,
                'bg-teal-200 text-teal-800': !value || !value.id
              }]"
            >{{ (value && value.id) ? 'Editando' : 'Creando' }}</span>

            <FormKit
              type="select"
              name="group_"
              help="Grupo al que deseas agregar esta pregunta"
              outer-class="!mb-0"
              :options="[
                { value: '', label: 'Ningúno' },
                ...groups.map(g => ({ value: g.id, label: g.question }))
              ]"
            />

            <button
              @click="closeModal"
              title="Cerrar"
              class="rounded-full hover:bg-black/10 p-2 m-1"
            > <IconClose class="h-4 w-4" /> </button>
          </div>

          <Basic :questionType="(value && value.type) as inputType"/>
          <Options
            v-if="['select', 'radio', 'checkbox'].includes(value?.type)"
            :questionType="(value && value.type) as inputType"
          />
          <Validation
            v-if="! ['group'].includes(value?.type)"
            :questionType="(value && value.type) as inputType"
          />
        </FormKit>
      </div>
    </div>
  </Teleport>
</template>
