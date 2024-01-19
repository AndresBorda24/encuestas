<script setup lang="ts">
import HeaderForm from '@/components/header-form.vue';
</script>

<template>
  <main class="max-h-screen relative">
    <HeaderForm />
    <section class="max-w-2xl mx-auto p-2 sm:p-3 md:p-4 lg:p-6 xl:p-10">
      <RouterView />
    </section>
  </main>
</template>
