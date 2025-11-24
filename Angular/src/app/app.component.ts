import { Component } from '@angular/core';

import type { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import type { DxChartTypes } from 'devextreme-angular/ui/chart';
import type { DxHtmlEditorTypes } from 'devextreme-angular/ui/html-editor';
import type { DxButtonTypes } from 'devextreme-angular/ui/button';
import { ObserverHelper, ObserverService } from './observer.service';
import {
  TestDataService, Order, List, Population,
} from './test-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
  providers: [TestDataService, ObserverService],
})
export class AppComponent {
  title = 'Angular';

  isDrawerOpened = false;

  headerSizeValues: (boolean | number)[] = [false, 1, 2, 3, 4, 5];

  fontSizeValues: string[] = [
    '8pt',
    '10pt',
    '12pt',
    '14pt',
    '18pt',
    '24pt',
    '36pt',
  ];

  fontFamilyValues: string[] = [
    'Arial',
    'Courier New',
    'Georgia',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Times New Roman',
    'Verdana',
  ];

  buttonProperties: DxButtonTypes.Properties = {
    icon: 'menu',
    onClick: (): void => {
      this.isDrawerOpened = !this.isDrawerOpened;
    },
  };

  navigation: List[];

  dataSource: Order[];

  populationData: Population[];

  helper: ObserverHelper;

  constructor(service: TestDataService, observerService: ObserverService) {
    this.navigation = service.getNavigationItems();
    this.dataSource = service.getOrders();
    this.populationData = service.getPopulationData();
    this.helper = observerService.getInstance();
  }

  onDataGridInitialized({ component, element }: DxDataGridTypes.InitializedEvent): void {
    if (!element || !component) return;
    this.helper.subscribe(component, element, component.updateDimensions, 0, 200);
  }

  onChartInitialized({ component, element }: DxChartTypes.InitializedEvent): void {
    if (!element || !component) return;
    this.helper.subscribe(component, element, component.render, 0, 0);
  }

  onHtmlEditorInitialized({ component, element }: DxHtmlEditorTypes.InitializedEvent): void {
    if (!element || !component) return;
    this.helper.subscribe(component, element, component.repaint, 0, 200);
  }
}
