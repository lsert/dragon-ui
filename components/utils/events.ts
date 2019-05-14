export default {
  on(el: EventTarget, type: string, callback: EventListener) {
    if (el.addEventListener) {
      el.addEventListener(type, callback, { passive: false });
    } else {
      (el as any).attachEvent(`on ${type}`, () => {
        (callback as () => void).call(el);
      });
    }
  },

  off(el: EventTarget, type: string, callback: EventListener) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback, { passive: false } as any);
    } else {
      (el as any).detachEvent(`off ${type}`, callback);
    }
  },

  once(el: EventTarget, type: string, callback: EventListener) {
    const typeArray = type.split(' ');
    const recursiveFunction = (e: Event) => {
      if (e.target) {
        e.target.removeEventListener(e.type, recursiveFunction, { passive: false } as any);
      }
      return callback(e);
    };

    for (let i = typeArray.length - 1; i >= 0; i -= 1) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
};
