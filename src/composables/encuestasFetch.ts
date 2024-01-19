import { createFetch } from "@vueuse/core";

export const useEncuestasFetch = createFetch({
    baseUrl: 'http://encuestas-back.test/api'
});
