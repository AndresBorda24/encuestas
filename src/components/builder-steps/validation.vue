<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { inputType, validationRule } from '@/types';

const props = withDefaults(
  defineProps<{ questionType?: inputType }>(), { questionType: "text" }
);

/** Definicion de las reglas de validacion */
const checkRules = ref<validationRule[]>([
  {
    value: 'required',
    label: 'Requerido',
    help: 'El usuario deberá responder obligatoriamente',
    for: [
      "radio", "checkbox", "text", "date", "email", "number", "range", "select", "tel", "textarea"
    ],
    requiredFor: [],
    params: [{
      type: 'hidden',
      value: 'trim'
    }]
  }, {
    value: 'matches',
    label: 'Número de Teléfono',
    help: 'El teléfono escrito por el usuario debe ser de formato valido.',
    for: ["tel"],
    requiredFor: ["tel"],
    params: [{
      type: 'hidden',
      value: /3[0-2]{1}[0-9]{8}/
    }]
  }, {
    value: 'email',
    label: 'Validar Email',
    help: 'Se validará que el texto que el usuario escriba sea un correo válido.',
    for: ["email" ],
    requiredFor: ["email"],
    params: []
  }, {
    value: 'contains_numeric',
    label: 'Debe Contener Números',
    help: 'La respuesta debe contener al menos un número.',
    for: ["text", "textarea"],
    requiredFor: [],
    params: []
  }, {
    value: 'length',
    label: 'Longitud de Texto',
    help: 'El campo debe tener una longitud entre dos valores. Ej: 100,500',
    for: ["text", "textarea"],
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
  }, {
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
  }, {
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
  }, {
    value: 'date_before',
    label: '"Antes de"',
    help: 'La fecha debe ser anterior de la establecida.',
    for: ["date"],
    requiredFor: [],
    params: [{
      type: 'date',
      validation: 'required'
    }]
  }, {
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
  checkRules.value.filter(r => props.questionType && r.for.includes(props.questionType)
))
</script>

<template>
  <section class="border border-dashed p-6 rounded relative border-neutral-400">
    <legend class="absolute -top-3 left-4 rounded-lg px-5 border text-sm bg-white">
      Reglas de Validación
    </legend>
    <p class="mb-2 text-sm text-gray-600">
      Estas reglas te permiten establecer cuando una respuesta debe ser aceptada.
    </p>
    <section class="grid divide-y border rounded bg-white">
      <FormKit type="list" name="rules">
        <template v-for="(rule, index) in availablesRules" :key="index" >
          <FormKit type="list" #="{ value }">
            <div class="p-3">
              <FormKit
                name="rule"
                type="checkbox"
                outer-class="!mb-0"
                label-class="!text-xs !font-bold"
                help-class="text-pretty"
                :on-value="rule.value"
                :validation="(questionType && rule.requiredFor.includes(questionType)) ? `required|is:${rule.value}` : []"
                :validation-messages="{
                  is: 'Esta validación es requerida con el tipo de pregunta seleccionada',
                  required: 'Esta validación es requerida con el tipo de pregunta seleccionada'
                }"
                validation-visibility="submit"
                :label="rule.label"
                :help="rule.help"
              />
              <div
                v-if="Boolean(value && value[0])"
                class="flex gap-1 flex-wrap pt-3"
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
