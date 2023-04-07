<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/582915038/21.2.12%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1136710)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
#  How to update a DevExtreme component if an external container state  is changed

This example demonstrates how to implement `ResizeObserver` to update a DevExtreme component layout if an external container visibility/size is changed.

No ResizeObserver 

![NotWorkingNew](https://user-images.githubusercontent.com/22076961/210073727-5b3a5899-2679-4953-9752-e869046aab58.gif)

With ResizeObserver

![WorkingNew](https://user-images.githubusercontent.com/22076961/210073705-b6db18d4-7fd1-4b4a-97e3-80a565471a2a.gif)

## Implementation details

Implement an `ObserverHelper` helper class. This class creates a single ResizeObserver instance and contains the following `API`:

* The `subscribe` method allows you to track changes in a parent container for the required component. It accepts the following parameters:
   * `component` - a widget instance.
   * `element` - the DOM node (HTML element) whose state you wish to track.
   * `resizeAction` - the callback that needs to be called.
   * `delta` - specify this parameter to avoid changing a component if size changes are small.
   * `delay` - specify this parameter to re-render a component with a delay (e.g., after animation is finished).

* The `disconnect` method clears all active subscriptions and removes a `ResizeObserver` instance.

The `resizeCallback` function in the helper class is called every time the container size is changed.
In this example, we also demonstrated how to reduce the number of calls using the `delay` and `delta` parameters.

## Files to Review

- **jQuery**    
    - [index.html](jQuery/src/index.html)
    - [index.js](jQuery/src/index.js)   
    - [utils.js](jQuery/src/utils.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
    - [observer.service.ts](Angular/src/app/observer.service.ts)
- **React**
    - [App.js](React/src/App.js)
    - [Content.js](React/src/components/Content.js)
    - [ResizeObserver.js](React/src/utils/ResizeObserver.js)

## Documentation

- [API Reference - updateDimensions](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#updateDimensions)
- [API Reference - repaint](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#repaint)
- [API Reference - render](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Methods/#render)


