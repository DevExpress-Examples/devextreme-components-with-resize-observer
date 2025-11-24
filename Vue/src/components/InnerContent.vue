<template>
  <div>
    <v-tabs
      v-model="tab"
      bg-color="primary"
    >
      <v-tab value="1">Chart</v-tab>
      <v-tab value="2">Accordion</v-tab>
      <v-tab value="3">DataGrid</v-tab>
    </v-tabs>

    <TabContent
      value="1"
      :selected-index="selectedIndex"
    >
      <DxChart
        id="chart"
        :data-source="populationData"
        @initialized="chartInitialized"
      >
        <DxSeries
          value-field="val"
          argument-field="arg"
          name="Population"
          type="bar"
          color="#ffaa66"
        />
      </DxChart>
    </TabContent>

    <TabContent
      value="2"
      :selected-index="selectedIndex"
    >
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-title>Accordion Item #1</v-expansion-panel-title>
          <v-expansion-panel-text>
            <DxHtmlEditor
              height="400px"
              @initialized="htmlEditorInitialized"
            >
              <DxToolbar :multiline="false">
                <DxItem name="undo"/>
                <DxItem name="redo"/>
                <DxItem name="separator"/>
                <DxItem
                  name="size"
                  :accepted-values="sizeValues"
                />
                <DxItem
                  name="font"
                  :accepted-values="fontValues"
                />
                <DxItem name="separator"/>
                <DxItem name="bold"/>
                <DxItem name="italic"/>
                <DxItem name="strike"/>
                <DxItem name="underline"/>
                <DxItem name="separator"/>
                <DxItem name="alignLeft"/>
                <DxItem name="alignCenter"/>
                <DxItem name="alignRight"/>
                <DxItem name="alignJustify"/>
                <DxItem name="separator"/>
                <DxItem name="orderedList"/>
                <DxItem name="bulletList"/>
                <DxItem name="separator"/>
                <DxItem
                  name="header"
                  :accepted-values="headerValues"
                />
                <DxItem name="separator"/>
                <DxItem name="color"/>
                <DxItem name="background"/>
                <DxItem name="separator"/>
                <DxItem name="link"/>
                <DxItem name="image"/>
                <DxItem name="separator"/>
                <DxItem name="clear"/>
                <DxItem name="codeBlock"/>
                <DxItem name="blockquote"/>
                <DxItem name="separator"/>
                <DxItem name="insertTable"/>
                <DxItem name="deleteTable"/>
                <DxItem name="insertRowAbove"/>
                <DxItem name="insertRowBelow"/>
                <DxItem name="deleteRow"/>
                <DxItem name="insertColumnLeft"/>
                <DxItem name="insertColumnRight"/>
                <DxItem name="deleteColumn"/>
              </DxToolbar>
            </DxHtmlEditor>
          </v-expansion-panel-text>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-title>Accordion Item #2</v-expansion-panel-title>
          <v-expansion-panel-text>
            <DxDataGrid
              id="gridContainer"
              :data-source="orders"
              :height="400"
              key-expr="ID"
              :column-hiding-enabled="true"
              :show-borders="true"
              @initialized="dataGridInitialized"
            >
              <DxGrouping
                :context-menu-enabled="true"
                expand-mode="rowClick"
              />
              <DxGroupPanel
                :visible="true"
                empty-panel-text="Use the context menu of header columns to group data"
              />
              <DxScrolling mode="virtual"/>
              <DxPaging :page-size="8"/>
              <DxColumnChooser
                :enabled="true"
                mode="select"
              />
              <DxColumn
                :allow-grouping="false"
                data-field="OrderNumber"
                :width="130"
                caption="Invoice Number"
              />
              <DxColumn
                data-field="CustomerStoreCity"
                caption="City"
              />
              <DxColumn
                data-field="CustomerStoreState"
                caption="State"
              />
              <DxColumn data-field="Employee"/>
              <DxColumn
                data-field="OrderDate"
                data-type="date"
              />
              <DxColumn
                data-field="SaleAmount"
                format="currency"
              />
            </DxDataGrid>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </TabContent>

    <TabContent
      value="3"
      :selected-index="selectedIndex"
    >
      <DxDataGrid
        id="gridContainer"
        :data-source="orders"
        :height="400"
        class="demo-content-grid"
        key-expr="OrderNumber"
        :column-min-width="150"
        :show-column-lines="true"
        :show-row-lines="true"
        :show-borders="true"
        @initialized="dataGridInitialized"
      >
        <DxGrouping/>
        <DxGroupPanel
          :visible="true"
          empty-panel-text="Use the context menu of header columns to group data"
        />
        <DxScrolling mode="virtual"/>
        <DxPaging :page-size="8"/>
        <DxColumnChooser
          :enabled="true"
          mode="select"
        />
        <DxColumn
          data-field="OrderNumber"
          :allow-grouping="false"
          :fixed="true"
          caption="Invoice Number"
        />
        <DxColumn
          data-field="Employee"
          data-type="string"
        />
        <DxColumn
          data-field="CustomerStoreCity"
          caption="City"
          data-type="string"
        />
        <DxColumn
          data-field="CustomerStoreState"
          :group-index="0"
          caption="State"
        />
        <DxColumn
          data-field="OrderDate"
          data-type="date"
        />
        <DxColumn
          data-field="SaleAmount"
          data-type="number"
          format="currency"
        />
        <DxColumn
          data-field="Terms"
          data-type="string"
        />
        <DxSummary>
          <DxGroupItem
            column="OrderNumber"
            summary-type="count"
            display-format="{0} orders"
          />
        </DxSummary>
      </DxDataGrid>
    </TabContent>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  DxDataGrid,
  DxColumn,
  DxGrouping,
  DxGroupPanel,
  DxPaging,
  DxColumnChooser,
  DxScrolling,
  DxSummary,
  DxGroupItem,
  type DxDataGridTypes,
} from 'devextreme-vue/data-grid';
import { DxChart, DxSeries, type DxChartTypes } from 'devextreme-vue/chart';
import {
  DxHtmlEditor,
  DxToolbar,
  DxItem,
  type DxHtmlEditorTypes,
} from 'devextreme-vue/html-editor';
import { observerInstance } from '../utils/ResizeObserver';
import { headerValues, fontValues, sizeValues } from '../utils/constants';
import TabContent from './TabContent.vue';
import { populationData, orders } from '../data';

interface ContentProps {
  selectedIndex: string;
}

const props = defineProps<ContentProps>();
const emit = defineEmits<{
  selectedIndexChange: [value: string];
}>();

const tab = ref<string>(props.selectedIndex);

watch(tab, (newValue: string): void => {
  emit('selectedIndexChange', newValue);
});

watch(
  () => props.selectedIndex,
  (newValue: string): void => {
    tab.value = newValue;
  },
);

function dataGridInitialized({ component, element }: DxDataGridTypes.InitializedEvent): void {
  if (component && element?.parentNode instanceof Element) {
    observerInstance.subscribe(component, element.parentNode, component.updateDimensions, 100, 0);
  }
}

function chartInitialized({ component, element }: DxChartTypes.InitializedEvent): void {
  if (component && element?.parentNode instanceof Element) {
    observerInstance.subscribe(component, element.parentNode, component.render, 0, 100);
  }
}

function htmlEditorInitialized({ component, element }: DxHtmlEditorTypes.InitializedEvent): void {
  if (component && element?.parentNode instanceof Element) {
    observerInstance.subscribe(component, element.parentNode, component.repaint, 0, 100);
  }
}
</script>
