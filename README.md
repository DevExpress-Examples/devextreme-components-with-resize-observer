#  How to update a DevExtreme component if an external container state  is changed

This example demonstrates how to implement `ResizeObserver` to update a DevExtreme component layout if an external container visibility/size is changed

## Implementation details

Implement an `ObserverHelper` helper class. This class creates a single ResizeObserver instance and ccontains the following `API`:

- The `subscribe` method allows you to track changes in a parent container for a required component. It accepts the following parameters:
    - `component` - a widget instance
    - `element` - a DOM node (HTML element) which state you wish to track
    - `resizeAction` - a callback that needs to be called
    - `delta` - specify this parameter to avoid changing a component if size changes are small  
    - `delay` - specify this parameter to re-render a component with a delay (e.g. after animation is finished)
- The `disconnect` method clears all active subscriptions and removes a `ResizeObserver` instance.    

The `resizeCallback` function in the helper class is called every time a container size is changed. 
In this example, we also demonstrated how to reduce the number of calls using the `delay` and `delta` parameters.

## Files to Look At

- **jQuery**    
    - [index.html](jQuery/src/index.html)
    - [index.js](jQuery/src/index.js)   
    - [utils.js](jQuery/src/utils.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
    - [observer.service.ts](Angular/src/app/observer.service.ts)

## Documentation

- [API Reference - updateDimensions](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#updateDimensions)
- [API Reference - repaint](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxDataGrid/Methods/#repaint)
- [API Reference - render](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxChart/Methods/#render)