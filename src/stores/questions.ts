import type { question } from '@/types';
import { useLocalStorage } from '@vueuse/core';

export const useQuestionsStore = defineStore('questions', () => {
    const questions = useLocalStorage<question[]>('form-questions', []);
    const groups = computed(() =>
        questions.value.filter(q => (q.type === 'group')
    ));

    // Acciones
    const getQuestion = (id: string, group?: string) => {
      if (!group) return questions.value.find(q => q.id === id);

      const q = questions.value.find(q => q.id === id);
      if (!q) return undefined;

      return q.questions?.find(y => y.id === id);
    };

    const addQuestion = (data: question) => {
      if (data.group) {
        const q = getQuestion(data.group);
        if (!q) return;
        q.questions ??= [];
        q.questions.push(data);
        return;
      }
      questions.value.push(data);
    };

    const deleteQuestion = (id: string, group?: string) => {
      questions.value = questions.value.filter(_ => _.id !== id);
    };

    const updateQuestion = (data: question) => {
      let q = getQuestion(data.id, data.group);

      if (data.group) {
        if (!q) {
          addQuestion(data);
          deleteQuestion(data.id);
          return;
        }
      }

      if (!q) return;
      q = data;
    };

    return {
      groups,
      questions,
      addQuestion,
      updateQuestion,
      deleteQuestion,
      getQuestion
    };
});
