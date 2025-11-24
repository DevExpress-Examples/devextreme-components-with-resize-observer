<template>
  <div class="demo-container">
    <NavigationHeader :on-click="toggleDrawer"/>
    <MainLayout
      :opened="opened"
      :selected-index="selectedIndex"
      @selected-index-change="onSelectedIndexChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NavigationHeader from '../components/NavigationHeader.vue';
import MainLayout from '../components/MainLayout.vue';

const selectedIndex = ref<string>('1');
const opened = ref<boolean>(true);

function onSelectedIndexChange(newValue: string): void {
  selectedIndex.value = newValue;
}

function toggleDrawer(): void {
  opened.value = !opened.value;
}
</script>

