import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxChartModule } from 'devextreme-angular/ui/chart';
import { DxHtmlEditorModule } from 'devextreme-angular/ui/html-editor';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { DxListModule } from 'devextreme-angular/ui/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DxHtmlEditorModule,
    MatTabsModule,
    MatDialogModule,
    DxListModule,
    DxDrawerModule,
    DxToolbarModule,
    DxDataGridModule,
    DxChartModule,
    DxHtmlEditorModule,
    DxButtonModule,
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
