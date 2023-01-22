class ObserverHelper {
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
    isSizeChanged = (value1, value2, delta) => {
        return !value1 || Math.abs(value2 - value1) > delta;
    };
    debounce = (func, timeout) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeout);
        };
    };
    resizeCallback = (component, delta = 1, resizeAction) =>
        (container) => {
            let { width, height } = container.contentRect;
            if (
                this.isSizeChanged(component.__observableWidth, width, delta) ||
                this.isSizeChanged(component.__observableHeight, height, delta)
            ) {
                component.__observableHeight = height;
                component.__observableWidth = width;
                resizeAction && resizeAction.apply(component);
            }
        };
    subscribe(component, element, resizeAction, delta, delay) {
        if (!resizeAction) {
            console.error('Subscription failed. No reisze callback passed')
            return
        }
        let listeners = this.__resizeCallbacks.get(element);
        if (!listeners) {
            this.__resizeObserver.observe(element);
            listeners = new Map();
        }
        const newResizeCallback = this.resizeCallback(component, delta, resizeAction);
        listeners.set(
            component.element(),
            delay ? this.debounce(newResizeCallback, delay) : newResizeCallback
        );
        this.__resizeCallbacks.set(element, listeners);
        component.on("disposing", ({ component }) => {
            this.unsubscribe(element, component.element());
        });
    }
    unsubscribe(key1, key2) {
        let listeners = this.__resizeCallbacks.get(key1);
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

const observerInstance = new ObserverHelper();

export { observerInstance };