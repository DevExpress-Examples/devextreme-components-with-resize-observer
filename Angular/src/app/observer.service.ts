import { Injectable } from '@angular/core';

export class ObserverHelper {
  private __resizeObserver: ResizeObserver;
  private __resizeCallbacks: Map<Element, Map<Element, Function>>;

  constructor() {
    this.__resizeCallbacks = new Map();
    this.__resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const listeners = this.__resizeCallbacks.get(entry.target);
        listeners &&
          listeners.forEach((resizeCallback) => resizeCallback(entry));
      });
    });
  }
  isSizeChanged = (value1: number, value2: number, delta: number) => {
    return !value1 || Math.abs(value2 - value1) > delta;
  };
  debounce = (func: Function, timeout: number) => {
    let timer: number;
    return (...args: any) => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  resizeCallback =
    (component: any, delta = 1, resizeAction: Function) =>
    (container: ResizeObserverEntry) => {
      let { width, height } = container.contentRect;
      if (
        this.isSizeChanged(component.__observableWidth, width, delta) ||
        this.isSizeChanged(component.__observableHeight, height, delta)
      ) {
        component.__observableHeight = height;
        component.__observableWidth = width;
        console.log('resize', component)
        resizeAction && resizeAction.apply(component);
      }
    };
  subscribe(
    component: any,
    element: Element | null,
    resizeAction: Function,
    delta: number,
    delay: number
  ) {
    if (!resizeAction || !element) {
      console.error('Subscription failed. No reisze callback or element passed');
      return;
    }
    let listeners = this.__resizeCallbacks.get(element);
    if (!listeners) {
      this.__resizeObserver.observe(element);
      listeners = new Map<Element, Function>();
    }
    const newResizeCallback = this.resizeCallback(
      component,
      delta,
      resizeAction
    );
    listeners.set(
      component.element(),
      delay ? this.debounce(newResizeCallback, delay) : newResizeCallback
    );
    this.__resizeCallbacks.set(element, listeners);
    component.on('disposing', ({ component }: any) => {
      this.unsubscribe(element, component.element());
    });
  }
  unsubscribe(key1: Element, key2: Element) {
    let listeners = this.__resizeCallbacks.get(key1);
    if (!listeners) {
      console.error('Unsubscribe failed');
      return;
    }
    listeners.delete(key2);
    if (listeners.size === 0) {
      this.__resizeCallbacks.delete(key1);
      this.__resizeObserver.unobserve(key1);
    } else {
      this.__resizeCallbacks.set(key1, listeners);
    }
  }
  disconnect() {
    this.__resizeCallbacks.clear();
    this.__resizeObserver.disconnect();
  }
}

const observerHelper = new ObserverHelper();

@Injectable({
  providedIn: 'root',
})
export class ObserverService {
   getInstance() {
      return observerHelper;
   }
}
