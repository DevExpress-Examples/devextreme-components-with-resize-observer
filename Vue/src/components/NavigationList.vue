<template>
  <div class="demo-content-list">
    <DxList
      :data-source="navigation"
      :hover-state-enabled="false"
      :active-state-enabled="false"
      :focus-state-enabled="false"
      class="dx-theme-accent-as-background-color"
    />
  </div>
</template>

<script setup lang="ts">
import { DxList } from 'devextreme-vue/list';
import { navigation } from '../data';
</script>
