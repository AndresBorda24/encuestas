import type { question } from '@/types';
import { useLocalStorage } from '@vueuse/core';

export const useQuestionsStore = defineStore('questions', () => {
    const questions = useLocalStorage<question[]>('form-questions', []);

    // Acciones
    const getQuestion    = (id: string) => questions.value.find(q => q.id === id);
    const addQuestion    = (data: question) => questions.value.push(data);
    const deleteQuestion = (id: string) => {
      questions.value = questions.value.filter(_ => _.id !== id);
    };
    const updateQuestion = (data: question) => {
      const id = questions.value.findIndex(f => f.id === data.id);
      if (id === -1) return;
      questions.value[ id ] = data;
    };

    return { questions, addQuestion, updateQuestion, deleteQuestion, getQuestion };
});
