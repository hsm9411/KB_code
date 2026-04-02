<template>
  <div class="container py-4">
    <Header />
    <div class="mt-4">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
</script>
