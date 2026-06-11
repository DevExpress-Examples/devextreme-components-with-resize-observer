class ObserverHelper {
  private readonly __resizeObserver: ResizeObserver;

  private readonly __resizeCallbacks: Map<Element, Map<Element, Function>>;

  constructor() {
    this.__resizeCallbacks = new Map();
    this.__resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const listeners = this.__resizeCallbacks.get(entry.target);
        listeners?.forEach((resizeCallback) => { resizeCallback(entry); });
      });
    });
  }

  isSizeChanged = (value1: number, value2: number, delta: number): boolean =>
    !value1 || Math.abs(value2 - value1) > delta;

  debounce = (func: Function, timeout: number): ((...args: any[]) => void) => {
    let timer: number;
    return (...args: any[]): void => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  resizeCallback = (component: any, resizeAction: Function, delta = 1) =>
    (container: ResizeObserverEntry): void => {
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

  subscribe(
    component: any,
    element: Element | null,
    resizeAction: Function,
    delta: number,
    delay: number,
  ): void {
    if (!resizeAction || !element) {
      console.error('Subscription failed. No resize callback or element passed');
      return;
    }
    let listeners = this.__resizeCallbacks.get(element);
    if (!listeners) {
      this.__resizeObserver.observe(element);
      listeners = new Map<Element, Function>();
    }
    const newResizeCallback = this.resizeCallback(
      component,
      resizeAction,
      delta,
    );
    listeners.set(
      component.element(),
      delay ? this.debounce(newResizeCallback, delay) : newResizeCallback,
    );
    this.__resizeCallbacks.set(element, listeners);
    component.on('disposing', ({ component }: any): void => {
      this.unsubscribe(element, component.element());
    });
  }

  unsubscribe(key1: Element, key2: Element): void {
    const listeners = this.__resizeCallbacks.get(key1);
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

  disconnect(): void {
    this.__resizeCallbacks.clear();
    this.__resizeObserver.disconnect();
  }
}

const observerInstance = new ObserverHelper();

export { observerInstance };
