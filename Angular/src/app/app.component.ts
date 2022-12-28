import { Component } from '@angular/core';
import { Properties as ButtonProperies } from 'devextreme/ui/button';
import { ObserverHelper, ObserverService } from './observer.service';
import { TestDataService, Order, List, Population } from './test-data.service';
import { InitializedEvent as DataGridInitializedEvent } from 'devextreme/ui/data_grid';
import { InitializedEvent as ChartInitializedEvent } from 'devextreme/viz/chart';
import { InitializedEvent as HtmlEditorInitializedEvent } from 'devextreme/ui/html_editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TestDataService, ObserverService],
})
export class AppComponent {
  title = 'Angular';
  isDrawerOpen: boolean = false;
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

  buttonProperies: ButtonProperies = {
    icon: 'menu',
    onClick: () => (this.isDrawerOpen = !this.isDrawerOpen),
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
  onDataGridInitialized({ component, element }: DataGridInitializedEvent) {
    if (!element || !component) return;
    this.helper.subscribe(component, element, component.updateDimensions, 0, 200);
  }
  onChartInitialized({ component, element }: ChartInitializedEvent) {
    if (!element || !component) return;
    this.helper.subscribe(component, element, component.render, 0, 0);
  }
  onHtmlEditorInitialized({ component, element }: HtmlEditorInitializedEvent) {
    if (!element || !component) return;
    this.helper.subscribe(component, element, component.repaint, 0, 200);
  }
}
