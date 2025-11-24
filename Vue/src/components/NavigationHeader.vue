<template>
  <DxToolbar class="demo-header">
    <DxItem
      location="before"
      widget="dxButton"
    >
      <DxButton
        icon="menu"
        @click="onClick"
      />
    </DxItem>
  </DxToolbar>
</template>

<script setup lang="ts">
import { DxToolbar, DxItem } from 'devextreme-vue/toolbar';
import { DxButton } from 'devextreme-vue/button';

defineProps<{
  onClick: () => void;
}>();
</script>
