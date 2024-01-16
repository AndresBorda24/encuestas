import type { question } from '@/types';
import { useLocalStorage } from '@vueuse/core';

export const useQuestionsStore = defineStore('questions', () => {
    const questions = useLocalStorage<question[]>('form-questions', []);
    const groups = computed(() => questions.value.filter(q => (q.type === 'group')));

    const questionsList = computed({
      get() {
        const x = (JSON.parse(JSON.stringify(questions.value)) as question[])
          .reduce((a: { [k: string]: question }, q) => {
            if (q.group) {
              if (!Boolean(a[q.group].questions)) a[q.group].questions = [];
              a[q.group].questions?.push(q);
              return a;
            }
            a[q.id] = q
            return a;
          }, {});

        return Object.values(x);
      },
      set(newValue) {
        setNewOrder(newValue);
      }
    });

    // Acciones
    const addQuestion = (data: question) => {
      console.log('AddFunction');
      questions.value.push(data);
    };

    const deleteQuestion = (id: string) => {
      console.log("DeleteFunction: ", id);
      questions.value = questions.value.filter(q => q.id !== id);
    };

    const updateQuestion = (data: question) => {
      console.log("UpdateFunction");
      const index = questions.value.findIndex(q => q.id === data.id);
      if(index === -1) return;
      questions.value[ index ] = data;
    };

    const setNewOrder = (newValue: question[]) => {
      questions.value = newValue.reduce((a: question[], c) => {
          let subQ = c.questions || [];
          a.push({
            id: c.id,
            type: c.type,
            question: c.question,
            questions: [],
            group: c.group,
            help: c.help,
            rules: c.rules,
            options: c.options,
            placeholder: c.placeholder,
            confirmation: c.confirmation,
            default: c.default
          });
          subQ.forEach(sq => a.push(sq));
          return a;
        }, []);
    }

    return {
      groups,
      questions,
      questionsList,
      addQuestion,
      updateQuestion,
      setNewOrder,
      deleteQuestion
    };
});
