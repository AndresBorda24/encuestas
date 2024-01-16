<script setup lang="ts">
import { useQuestionsStore } from '@/stores/questions';
import { useSortable, moveArrayElement } from '@vueuse/integrations/useSortable';
// Components ------------->
import InputRange  from '@/components/input-range.vue';
import InputGlobal from '@/components/input-global.vue';
import QuestionActions from '@/components/question-actions.vue';

const props = defineProps<{
  value: any | any[]
  questions: question[]
}>();

// Estas clases estan definidas para que tailwind las cargue.
const classes = ["group/group","group/item","group-hover/group:flex","group-hover/item:flex "];
const group = ref<HTMLElement | null>(null);

useSortable(group, props.questions, {
  handle: '.move-handle',
  animation: 200,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'bg-teal-500/20',
  onUpdate: (e) => {
    moveArrayElement(props.questions, e.oldIndex, e.newIndex );
    nextTick(() => {
      useQuestionsStore().setNewOrder( useQuestionsStore().questionsList );
    });
  }
});
</script>

<template>
  <div ref="group">
    <div
      v-for="question in questions" :key="question.id"
      :class="`group/${ question.type === 'group' ? 'group' : 'item' } relative border border-gray-50 rounded p-3 sm:p-4 md:p-5 border-dashed hover:border-teal-500`"
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
