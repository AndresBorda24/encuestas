<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { inputType } from '@/types';

const props = defineProps<{ type?: inputType }>()

type validationRule = {
  value: string,
  label: string,
  help: string,
  for: inputType[],
  requiredFor: inputType[],
  params: {
    type: string,
    value?: string,
    label?: string,
    validation?: string | [rule: string, ... params: any[]][],
    placeholder?: string,
    help?: string
  }[]
}

/** Definicion de las reglas de validacion */
const checkRules = ref<validationRule[]>([
  {
    value: 'required',
    label: 'Requerido',
    help: 'El usuario deberá responder obligatoriamente',
    for: [
      "radio", "checkbox", "text", "date", "color", "email", "number", "password",
      "range", "select", "tel", "textarea"
    ],
    requiredFor: [],
    params: [{
      type: 'hidden',
      value: 'trim'
    }]
  },
  {
    value: 'email',
    label: 'Validar Email',
    help: 'Se validará que el texto que el usuario escriba sea un correo válido.',
    for: ["email" ],
    requiredFor: ["email"],
    params: []
  },
  {
    value: 'contains_numeric',
    label: 'Debe Contener Números',
    help: 'La respuesta debe contener al menos un número.',
    for: ["text", "textarea", "password"],
    requiredFor: [],
    params: []
  },
  {
    value: 'length',
    label: 'Longitud de Texto',
    help: 'El campo debe tener una longitud entre dos valores. Ej: 100,500',
    for: ["text", "textarea", "password"],
    requiredFor: [],
    params: [{
      type: 'number',
      label: 'Valor Mínimo',
      placeholder: 'Mínimo',
      validation: 'required:trim|number'
    },{
      type: 'number',
      label: 'Valor Máximo',
      placeholder: 'Máximo',
      validation: 'required:trim|number'
    }]
  },
  {
    value: 'min',
    label: 'Mínimo',
    help: 'Debe tener un valor mínimo específico. Ej: 1',
    for: ["number", "range"],
    requiredFor: ["range"],
    params: [{
      type: 'number',
      label: 'Valor Mínimo',
      validation: 'required:trim|number'
    }]
  },
  {
    value: 'max',
    label: 'Máximo',
    help: 'Debe tener un valor máximo específico. Ej: 500',
    for: ["number", "range"],
    requiredFor: ["range"],
    params: [{
      type: 'number',
      label: 'Valor Máximo',
      validation: 'required:trim|number'
    }]
  },
  // Buscar una mejor implementacion para esta regla. Igualmente no creo que sea
  // una validacion indispensable
  // {
  //   value: 'is',
  //   label: '"Es"',
  //   help: 'Debe ser uno de los valores específicos.',
  //   for: [],
  //   params: [{
  //     type: 'string',
  //     validation: 'required:trim|number'
  //   }]
  // },
  {
    value: 'date_before',
    label: '"Antes de"',
    help: 'La fecha debe ser anterior de la establecida.',
    for: ["date"],
    requiredFor: [],
    params: [{
      type: 'date',
      validation: 'required'
    }]
  },
  {
    value: 'date_after',
    label: '"Despues de"',
    help: 'La fecha debe ser despúes de la establecida.',
    for: ["date"],
    requiredFor: [],
    params: [{
      type: 'date',
      validation: 'required'
    }]
  }
])

const availablesRules = computed(() =>
  checkRules.value.filter(r => props.type && r.for.includes(props.type)
))
</script>

<template>
  <!-- <FormKit type="group" name="rules" > -->
    <section>
      <span class="font-bold text-sm text-gray-600">Reglas de Validación</span>
      <p class="mb-2 text-sm text-gray-600">
        Estas reglas te permiten establecer cuando una respuesta debe ser aceptada.
      </p>
      <section class="grid divide-y border rounded bg-gray-50">
        <FormKit type="list" name="rules">
          <template v-for="(rule, index) in availablesRules" :key="index" >
            <FormKit type="list" #="{ value }">
              <div class="p-3">
                <FormKit
                  name="rule"
                  type="checkbox"
                  outer-class="max-w-full"
                  help-class="text-pretty"
                  :on-value="rule.value"
                  :validation="(type && rule.requiredFor.includes(type)) ? `is:${rule.value}` : []"
                  :validation-messages="{
                    is: 'Esta validación es requerida con el tipo de pregunta seleccionada'
                  }"
                  :label="rule.label"
                  :help="rule.help"
                />
                <div
                  v-if="Boolean(value && value[0])"
                  class="flex gap-1 flex-wrap"
                >
                  <FormKit
                    autocomplete="off"
                    v-for="(param, index) in rule.params" :key="index"
                    :type="param.type"
                    outer-class="!mb-0"
                    :value="param.value"
                    help-class="text-pretty"
                    :label="param.label"
                    :name="`${param.type}-${index}`"
                    :validation="param.validation"
                    :placeholder="param.placeholder"
                    :help="param.help"
                  />
                </div>
              </div>
            </FormKit>
          </template>
        </FormKit>
      </section>
    </section>
</template>
