import { getNode } from "@formkit/core";
import { useEncuestasFetch } from "@/composables/encuestasFetch";
import type { cabecera } from "@/types";

export const useCabeceraStore = defineStore('cabecera', () => {
    const data = ref<cabecera|null>(null);
    const error = ref(null);
    const setData = (newData: cabecera) => data.value = newData;
    const clearData = () => data.value = null;
    const url = computed((): string => (data.value?.id)
        ? `/encuestas/${data.value.id}/update`
        : "/encuestas/create"
    );

    const save = async () => {
        error.value = null;
        if (data.value === null) return;
        const { data: res, error: e } = await useEncuestasFetch(url.value)
            .post(data)
            .json();

        if (e.value) {
            error.value = e.value;
            return false;
        }

        if (! Boolean(data.value.id)) data.value.id = res.value.id;
        return data.value.id;
    };

    const getCabecera = async (id: string|number, loadForm = false) => {
        const { data: res, error: e } = await useEncuestasFetch(
            `/encuestas/${id}/get-cab`
        ).json();

        if (e.value) {
            error.value = e.value;
            return false;
        }

        data.value = res.value;
        if (loadForm) loadFormData(data.value as cabecera);
        return data;
    };

    return { data, setData, clearData, save, error, getCabecera };
});

async function loadFormData(data: cabecera) {
    const form = getNode('cabecera-form');
    await form?.input(data);
}
