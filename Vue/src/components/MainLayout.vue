<template>
  <DxDrawer
    :opened="opened"
    :close-on-outside-click="false"
    :height="heightValue"
    template="NavigationList"
  >
    <template #NavigationList>
      <NavigationList/>
    </template>
    <div class="demo-content">
      <InnerContent
        :selected-index="selectedIndex"
        @selected-index-change="onSelectedIndexChange"
      />
    </div>
  </DxDrawer>
</template>

<script setup lang="ts">
import { DxDrawer } from 'devextreme-vue/drawer';
import NavigationList from './NavigationList.vue';
import InnerContent from './InnerContent.vue';
import { heightValue } from '../utils/constants';

interface MainProps {
  opened: boolean;
  selectedIndex: string;
}

defineProps<MainProps>();

const emit = defineEmits<{
  selectedIndexChange: [value: string];
}>();

function onSelectedIndexChange(value: string): void {
  emit('selectedIndexChange', value);
}
</script>
