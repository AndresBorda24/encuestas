<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { inputType } from '@/types';

const props = defineProps<{
  type?: inputType
}>()


type validationRule = {
  value: string,
  label: string,
  help: string,
  for: inputType[],
  withParams: boolean,
  paramsPlaceholder: string | undefined,
  paramsValidation: string | any[][] | undefined,
  paramsHelp: string | undefined
}

const checkRules = ref<validationRule[]>([
  {
    value: 'required:trim',
    label: 'Requerido',
    help: 'El usuario deberá responder obligatoriamente',
    for: [],
    withParams: false,
    paramsPlaceholder: undefined,
    paramsValidation: undefined,
    paramsHelp: undefined
  },
  {
    value: 'contains_numeric',
    label: 'Debe Contener Números',
    help: 'La respuesta debe contener al menos un número.',
    for: [],
    withParams: false,
    paramsPlaceholder: undefined,
    paramsValidation: undefined,
    paramsHelp: undefined
  },
  {
    value: 'length',
    label: 'Longitud de Texto',
    help: 'El campo debe tener una longitud entre dos valores. Ej: 100,500',
    for: [],
    withParams: true,
    paramsPlaceholder: "minimo,maximo",
    paramsValidation: [['required'], ['matches',/\d+,\d+/]],
    paramsHelp: "Solamente aplica a campos de Texto"
  },
  {
    value: 'min',
    label: 'Mínimo',
    help: 'Debe tener un valor mínimo específico. Ej: 1',
    for: [],
    withParams: true,
    paramsPlaceholder: "minimo",
    paramsValidation: 'required|number',
    paramsHelp: "Solamente aplica a números"
  },
  {
    value: 'max',
    label: 'Máximo',
    help: 'Debe tener un valor máximo específico. Ej: 500',
    for: [],
    withParams: true,
    paramsPlaceholder: "maximo",
    paramsValidation: 'required|number',
    paramsHelp: "Solamente aplica a números"
  },
  {
    value: 'is',
    label: '"Es"',
    help: 'Debe ser uno de los valores específicos.',
    for: [],
    withParams: true,
    paramsPlaceholder: "valor1,valor2...",
    paramsValidation: undefined,
    paramsHelp: "Solamente aplica a campos de Texto"
  },
  {
    value: 'date_before',
    label: '"Antes de"',
    help: 'La fecha debe ser antes de la establecida.',
    for: [],
    withParams: true,
    paramsPlaceholder: "aaaa-mm-dd",
    paramsValidation: 'required|date_format:YYYY-MM-DD',
    paramsHelp: "Solamente aplica a campos de Fecha"
  },
  {
    value: 'date_after',
    label: '"Despues de"',
    help: 'La fecha debe ser antes de la establecida.',
    for: [],
    withParams: true,
    paramsPlaceholder: "aaaa-mm-dd",
    paramsValidation: 'required|date_format:YYYY-MM-DD',
    paramsHelp: "Solamente aplica a campos de Fecha"
  }
])
</script>
<template>
  <FormKit
    type="group"
    name="rules"
  >
    <section>
      <span class="font-bold text-sm text-gray-600">Reglas de Validación</span>
      <p class="mb-2 text-sm text-gray-600">
        Estas reglas te permiten establecer cuando una respuesta debe ser aceptada.
      </p>
      <section class="grid divide-y border rounded bg-gray-50">
        <template v-for="(rule, index) in checkRules" :key="index" >
          <FormKit type="group" #default="{ value }">
            <div class="grid grid-cols-2 gap-2 p-3">
              <FormKit
                type="checkbox"
                name="rule"
                outer-class="max-w-full"
                help-class="text-pretty"
                :on-value="rule.value"
                :label="rule.label"
                :help="rule.help"
              />
              <FormKit
                v-if="rule.withParams && value.rule"
                type="text"
                outer-class="max-w-full !mb-0"
                help-class="text-pretty"
                name="params"
                :validation="rule.paramsValidation"
                :placeholder="rule.paramsPlaceholder"
                :help="rule.paramsHelp"
              />
            </div>
          </FormKit>
        </template>

      </section>
    </section>
  </FormKit>
</template>
