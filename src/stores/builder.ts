import { getNode } from '@formkit/core';
import { useNProgress } from '@vueuse/integrations/useNProgress'
import type { question } from '@/types';

export const useBuilderStore = defineStore('builder', () => {
    const visible = ref(false);
    const { isLoading } = useNProgress();
    const baseQuestion: question = {
      id: '',
      type: 'text',
      group: '',
      question: '',
      help: '',
      rules: [],
      options: [],
      placeholder: '',
      confirmation: false,
      default: ''
    };

    /**
     * Setea el formulario de adicion con los datos actuales de `question`. Si
     * `isCopy` es true remueve el id de `question` para que el sistema lo
     * interprete como una nueva pregunta.
    */
    const setQuestion = async (question: question, isCopy = false) => {
      isLoading.value = true;
      const d = JSON.parse(JSON.stringify(question));
      if (isCopy) d.id = "";
      const form = getNode('field-builder');
      await form?.input(d);
      visible.value = true;
      isLoading.value = false;
    };

    /**
     * Abre el modal de creacion de preguntas
    */
    const newQuestion = async (groupId?: string) => {
      const x = {...baseQuestion};
      if ( groupId ) x.group = groupId;
      setQuestion(x, false);
    }

    return { visible, setQuestion, newQuestion, baseQuestion };
});
