$(function () {
    const helper = new ObserverHelper();

    const drawer = $('#drawer').dxDrawer({
        opened: true,
        height: 'calc(100% - 40px)',
        closeOnOutsideClick: false,
        template() {
            const $list = $('<div>').width(200).addClass('panel-list');

            return $list.dxList({
                dataSource: navigation,
                hoverStateEnabled: false,
                focusStateEnabled: false,
                activeStateEnabled: false,
                elementAttr: { class: 'dx-theme-accent-as-background-color' },
            });
        },
    }).dxDrawer('instance');

    $('#toolbar').dxToolbar({
        items: [{
            widget: 'dxButton',
            location: 'before',
            options: {
                icon: 'menu',
                onClick() {
                    drawer.toggle();
                },
            },
        }],
    });

    $('#gridContainer').dxDataGrid({
        onInitialized({ component, element }) {
            helper.subscribe(component, element.parent().get(0), component.updateDimensions, 100, 0);
        },
        dataSource: orders,
        keyExpr: 'ID',
        columnHidingEnabled: true,
        showBorders: true,
        height: 400,
        scrolling: {
            mode: 'virtual'
        },
        grouping: {
            contextMenuEnabled: true,
            expandMode: 'rowClick',
        },
        groupPanel: {
            emptyPanelText: 'Use the context menu of header columns to group data',
            visible: true,
        },
        paging: {
            pageSize: 8,
        },
        columnChooser: {
            enabled: true,
            mode: 'select',
        },
        columns: [{
            allowGrouping: false,
            dataField: 'OrderNumber',
            caption: 'Invoice Number',
            width: 130,
        }, {
            caption: 'City',
            dataField: 'CustomerStoreCity',
        }, {
            caption: 'State',
            groupIndex: 0,
            dataField: 'CustomerStoreState',
        },
            'Employee', {
            dataField: 'OrderDate',
            dataType: 'date',
        }, {
            dataField: 'SaleAmount',
            format: 'currency',
        }],
    });

    $("#htmlEditor")
        .dxHtmlEditor({
            onInitialized({ component, element }) {
                helper.subscribe(component, element.parent().get(0), component.repaint, 100);
            },
            height: 430,
            value: "",
            toolbar: {
                multiline: false,
                items: [
                    "undo",
                    "redo",
                    "separator",
                    {
                        name: "size",
                        locateInMenu: "auto",
                        acceptedValues: [
                            "8pt",
                            "10pt",
                            "12pt",
                            "14pt",
                            "18pt",
                            "24pt",
                            "36pt"
                        ]
                    },
                    {
                        name: "font",
                        locateInMenu: "auto",
                        acceptedValues: [
                            "Arial",
                            "Courier New",
                            "Georgia",
                            "Impact",
                            "Lucida Console",
                            "Tahoma",
                            "Times New Roman",
                            "Verdana"
                        ]
                    },
                    "separator",
                    "bold",
                    "italic",
                    "strike",
                    "underline",
                    "separator",
                    "alignLeft",
                    "alignCenter",
                    "alignRight",
                    "alignJustify",
                    "separator",
                    "orderedList",
                    "bulletList",
                    "separator",
                    {
                        name: "header",
                        locateInMenu: "auto",
                        acceptedValues: [false, 1, 2, 3, 4, 5]
                    },
                    "separator",
                    "color",
                    "background",
                    "separator",
                    "link",
                    "image",
                    "separator",
                    "clear",
                    "codeBlock",
                    "blockquote",
                    "separator",
                    "insertTable",
                    "deleteTable",
                    "insertRowAbove",
                    "insertRowBelow",
                    "deleteRow",
                    "insertColumnLeft",
                    "insertColumnRight",
                    "deleteColumn"
                ]
            },
            mediaResizing: {
                enabled: true
            }
        });
    $('#barChart').dxChart({
        onInitialized({ component, element }) {
            helper.subscribe(component, element.parent().get(0), component.render, 0, 100);
        },
        dataSource,
        size: {
            height: 300
        },
        series: {
            argumentField: 'day',
            valueField: 'oranges',
            name: 'My oranges',
            type: 'bar',
            color: '#ffaa66',
        }
    });
});