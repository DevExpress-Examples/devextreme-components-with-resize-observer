class ObserverHelper {
  constructor() {
    this.__resizeCallbacks = new Map();
    this.__resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const listeners = this.__resizeCallbacks.get(entry.target);
        listeners?.forEach((resizeCallback) => { resizeCallback(entry); });
      });
    });
  }

  isSizeChanged = (value1, value2, delta) => !value1 || Math.abs(value2 - value1) > delta;

  // eslint-disable-next-line spellcheck/spell-checker
  debounce = (func, timeout) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);

      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  resizeCallback = (component, resizeAction, delta = 1) => (container) => {
    const { width, height } = container.contentRect;
    if (
      this.isSizeChanged(component.__observableWidth, width, delta)
                || this.isSizeChanged(component.__observableHeight, height, delta)
    ) {
      component.__observableHeight = height;
      component.__observableWidth = width;
      if (width === 0 || height === 0) return;
      resizeAction?.apply(component);
    }
  };

  subscribe(component, element, resizeAction, delta, delay) {
    if (!resizeAction) {
      console.error('Subscription failed. No reisze callback passed');
      return;
    }
    let listeners = this.__resizeCallbacks.get(element);
    if (!listeners) {
      this.__resizeObserver.observe(element);
      listeners = new Map();
    }
    const newResizeCallback = this.resizeCallback(component, resizeAction, delta);
    listeners.set(
      component.element().get(0),
      // eslint-disable-next-line spellcheck/spell-checker
      delay ? this.debounce(newResizeCallback, delay) : newResizeCallback,
    );
    this.__resizeCallbacks.set(element, listeners);
    component.on('disposing', (args) => {
      this.unsubscribe(element, args.component.element().get(0));
    });
  }

  unsubscribe(key1, key2) {
    const listeners = this.__resizeCallbacks.get(key1);
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
