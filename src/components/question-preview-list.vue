<script setup lang="ts">
import { useQuestionsStore } from '@/stores/questions';
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable';
// Components ------------->
import InputRange  from '@/components/input-range.vue';
import InputGlobal from '@/components/input-global.vue';
import QuestionActions from '@/components/question-actions.vue';

const props = defineProps<{
  value: any | any[]
  questions?: []
}>();

const group = ref<HTMLElement | null>(null);
const questionsList = props.questions
  ? props.questions
  : storeToRefs( useQuestionsStore() ).questionsList;

useSortable(group, questionsList.value, {
  handle: '.move-handle',
  animation: 200,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'bg-teal-500/20',
  onUpdate: (e) => {
    moveArrayElement(questionsList, e.oldIndex, e.newIndex );
    nextTick(() => {
      if (! isRef(questionsList)) {
        useQuestionsStore().setNewOrder( useQuestionsStore().questionsList );
      }
    });
  }
});
</script>

<template>
  <div ref="group">
    <div
      v-for="question in questionsList" :key="question.id"
      class="group relative border border-gray-50 rounded p-4 border-dashed hover:border-teal-500"
    >
      <QuestionActions :question="question"/>
      <InputRange
        v-if="question.type == 'range'"
        :question="question"
        :value="value[ question.id ]"
      />
      <template v-else-if="question.type == 'group'">
        <span class="font-bold text-lg">{{ question.question }}</span>
        <p class="text-gray-700 text-sm">{{ question.help }}</p>
        <div class="p-2 border border-dotted border-gray-400 rounded">
          <QuestionPreviewList
            :questions="question.questions || []"
            :value="value"
          />
        </div>
      </template>
      <InputGlobal
        v-else
        :question="question"
      />
    </div>
  </div>
</template>
