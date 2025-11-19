import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import HtmlEditor, {
    Toolbar, Item,
} from 'devextreme-react/html-editor';

import { Chart, Series } from 'devextreme-react/chart';
import DataGrid, {
    Column, Grouping, GroupPanel, Paging, ColumnChooser, Scrolling,
    Summary, GroupItem
} from 'devextreme-react/data-grid';

import { observerInstance } from '../utils/ResizeObserver';
import {
    headerValues,
    fontValues,
    sizeValues
} from '../utils/constants';
import Accordion from 'react-bootstrap/Accordion';
import TabContent from './TabContent';

import { chartDataSource, gridDataSource } from '../data';

const dataGridInitialized = ({ component, element }) => {
    observerInstance.subscribe(component, element.parentNode, component.updateDimensions, 100, 0);
}
const chartInitialized = ({ component, element }) => {
    observerInstance.subscribe(component, element.parentNode, component.render, 0, 100);
}
const htmlEditorInitialized = ({ component, element }) => {
    observerInstance.subscribe(component, element.parentNode, component.repaint, 100);
}

const Content = React.memo(({ selectedIndex, selectedIndexChange }) => {
    return (
        <>
            <Tabs
                value={selectedIndex}
                onChange={selectedIndexChange}
            >
                <Tab value={'1'} label="Chart" />
                <Tab value={'2'} label="Accordion" />
                <Tab value={'3'} label="DataGrid" />
            </Tabs>
            <TabContent value="1" selectedIndex={selectedIndex}   >
                <Chart id="chart" onInitialized={chartInitialized} dataSource={chartDataSource}>
                    <Series
                        valueField="oranges"
                        argumentField="day"
                        name="My oranges"
                        type="bar"
                        color="#ffaa66" />
                </Chart>
            </TabContent>
            <TabContent value="2" selectedIndex={selectedIndex}   >
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                            <HtmlEditor
                                height="400px"
                                onInitialized={htmlEditorInitialized}
                                defaultValue={''}
                            >
                                <Toolbar multiline={false}>
                                    <Item name="undo" />
                                    <Item name="redo" />
                                    <Item name="separator" />
                                    <Item
                                        name="size"
                                        acceptedValues={sizeValues}
                                    />
                                    <Item
                                        name="font"
                                        acceptedValues={fontValues}
                                    />
                                    <Item name="separator" />
                                    <Item name="bold" />
                                    <Item name="italic" />
                                    <Item name="strike" />
                                    <Item name="underline" />
                                    <Item name="separator" />
                                    <Item name="alignLeft" />
                                    <Item name="alignCenter" />
                                    <Item name="alignRight" />
                                    <Item name="alignJustify" />
                                    <Item name="separator" />
                                    <Item name="orderedList" />
                                    <Item name="bulletList" />
                                    <Item name="separator" />
                                    <Item
                                        name="header"
                                        acceptedValues={headerValues}
                                    />
                                    <Item name="separator" />
                                    <Item name="color" />
                                    <Item name="background" />
                                    <Item name="separator" />
                                    <Item name="link" />
                                    <Item name="image" />
                                    <Item name="separator" />
                                    <Item name="clear" />
                                    <Item name="codeBlock" />
                                    <Item name="blockquote" />
                                    <Item name="separator" />
                                    <Item name="insertTable" />
                                    <Item name="deleteTable" />
                                    <Item name="insertRowAbove" />
                                    <Item name="insertRowBelow" />
                                    <Item name="deleteRow" />
                                    <Item name="insertColumnLeft" />
                                    <Item name="insertColumnRight" />
                                    <Item name="deleteColumn" />
                                </Toolbar>
                            </HtmlEditor>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                            <DataGrid
                                id="gridContainer"
                                dataSource={gridDataSource}
                                onInitialized={dataGridInitialized}
                                height={400}
                                keyExpr="ID"
                                columnHidingEnabled={true}
                                showBorders={true}>
                                <Grouping contextMenuEnabled={true} expandMode="rowClick" />
                                <GroupPanel visible={true} emptyPanelText="Use the context menu of header columns to group data" />
                                <Scrolling mode="virtual" />
                                <Paging defaultPageSize={8} />
                                <ColumnChooser enabled={true} mode="select" />
                                <Column allowGrouping={false} dataField="OrderNumber" width={130} caption="Invoice Number" />
                                <Column dataField="CustomerStoreCity" caption="City" />
                                <Column dataField="CustomerStoreState" caption="State" />
                                <Column dataField="Employee" />
                                <Column dataField="OrderDate" dataType="date" />
                                <Column dataField="SaleAmount" format="currency" />
                            </DataGrid>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </TabContent>
            <TabContent value="3" selectedIndex={selectedIndex}   >
                <DataGrid
                    id="gridContainer"
                    dataSource={gridDataSource}
                    onInitialized={dataGridInitialized}
                    height={400}
                    className="demo-content-grid"
                    keyExpr="OrderNumber"
                    columnMinWidth={150}
                    showColumnLines={true}
                    showRowLines={true}
                    showBorders={true}>
                    <Grouping />
                    <GroupPanel visible={true} emptyPanelText="Use the context menu of header columns to group data" />
                    <Scrolling mode="virtual" />
                    <Paging defaultPageSize={8} />
                    <ColumnChooser enabled={true} mode="select" />
                    <Column dataField="OrderNumber" allowGrouping={false} fixed={true} caption="Invoice Number" />
                    <Column dataField="Employee" dataType="string" />
                    <Column dataField="CustomerStoreCity" caption="City" dataType="string" />
                    <Column dataField="CustomerStoreState" defaultGroupIndex={0} caption="State" />
                    <Column dataField="OrderDate" dataType="date" />
                    <Column dataField="SaleAmount" dataType="number" format="currency" />
                    <Column dataField="Terms" dataType="string" />
                    <Summary>
                        <GroupItem
                            column="OrderNumber"
                            summaryType="count"
                            displayFormat="{0} orders" />
                    </Summary>
                </DataGrid>
            </TabContent>
        </>)
});

export default Content;