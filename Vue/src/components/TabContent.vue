<template>
  <div v-show="selectedIndex === value">
    <slot/>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  selectedIndex: string;
}>();
</script>
