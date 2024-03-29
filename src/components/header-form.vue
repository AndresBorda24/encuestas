<script setup lang="ts">
import { FormKit } from '@formkit/vue';
import type { cabecera } from '@/types';
import { useCabeceraStore } from '@/stores/cabecera';

const route = useRoute();
const color = ref('blue');
const router = useRouter();
const { data: dataCabecera } = storeToRefs( useCabeceraStore() );
const id = computed((): undefined|string => route.params?.id as string);
const loadData = () => (id.value) ? useCabeceraStore().getCabecera(id.value, true) : null;

const onSubmit = async (data: cabecera) => {
  useCabeceraStore().setData({
    id: id.value,
    title: data.title,
    description: data.description,
    color: color.value,
    require_intranet: data.require_intranet
  });
  const newId = await useCabeceraStore().save();
  if (id.value || !newId) return;
  router.push({ name: "update-encuesta", params: { id: newId } });
};

watch(id, () => loadData());
onMounted(() => loadData());
</script>

<template>
<article :class="`min-h-[60vh] bg-${color}-600 relative flex flex-col text-neutral-200 transition-colors duration-300`">
  <div class="w-full flex justify-between p-4 mb-4">
    <img
      src="https://asotrauma.com.co/wp-content/uploads/2021/09/Asotrauma-logo-w.svg"
      alt="Logo-Asotrauma Blanco"
      class="h-6"
    >
  </div>
  <div class="max-w-3xl mx-auto">
    <FormKit
      @submit="onSubmit"
      type="form"
      id="cabecera-form"
      submit-label="Guardar"
      :config="{
        classes: {
          label: {
            $reset: true,
            'text-white font-bold text-sm': true
          },
          message: {
            $reset: true,
            'text-black font-bold text-xs bg-red-200 p-1 rounded': true
          },
        }
      }"
      :submit-attrs="{
        inputClass: `$reset bg-${color}-800 text-${color}-200 px-3 py-2 rounded hover:bg-${color}-700 hover:text-${color}-100 hover:scale-95`,
        wrapperClass: `border-t pt-3 mt-8 border-${color}-300`,
        helpClass: '$reset text-neutral-200/70 text-xs',
        help: 'Para guardar los cambios realizados en la Cabecera pulsa Guardar'
      }"
    >
      <FormKit
        type="text"
        placeholder="Escribe aquí el titulo de la encuesta"
        label="Título de la encuesta"
        validation="required|length:10,200"
        :classes="{
          inner: {
            $reset: true,
            'px-2 py-1 border-b border-dashed border-neutral-100 text-neutral-100 text-3xl hover:border-solid focus-within:border-solid w-full': true
          },
          input: {
            $reset: true,
            'bg-transparent outline-none focus:outline-none w-full max-w-[90vw] placeholder:text-slate-100/30': true
          }
        }"
        name="title"
      />

      <FormKit
        type="textarea"
        rows="8"
        validation="required|length:10,800"
        label="Descripción de la encuesta"
        placeholder="Una presentación a la encuesta para contextualizar al usuario"
        :classes="{
          inner: {
            $reset: true,
            'px-2 py-1 border border-dashed rounded border-neutral-100 text-neutral-100 text-md hover:border-solid focus-within:border-solid w-full mb-1': true
          },
          input: {
            $reset: true,
            'bg-transparent outline-none focus:outline-none w-full max-w-[90vw] placeholder:text-slate-100/30': true
          }
        }"
        name="description"
      />
      <FormKit
        type="checkbox"
        label="Solicitar Inicio de Sesión de intranet"
        help="Los usuarios deberán iniciar sesión para poder responder la encuesta. Activa esta opción si quieres que solo la responda el personal de la Clínica."
        name="require_intranet"
        :value="false"
        :classes="{
          help: {
            $reset: true,
            'text-neutral-200/70 text-xs': true
          }
        }"
      />
    </FormKit>

    <!-- Fechas -->
    <p class="text-xs" v-if="dataCabecera?.created_at">
      <span class="font-bold">Creada el:</span> {{ dataCabecera?.created_at }}
    </p>
    <p class="text-xs" v-if="dataCabecera?.updated_at">
      <span class="font-bold">Ultima actualizacion de cabecera:</span>
      {{ dataCabecera?.updated_at }}
    </p>
  </div>
</article>
</template>
