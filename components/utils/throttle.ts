const throttle = (func: (...arg: any[]) => any, delay: number = 100) => {
  let timer: number;
  let startTime = Date.now();

  return function (this: any, ...args: any[]) {
    const curTime = Date.now();
    const remaining = delay - (curTime - startTime);
    const context = this;
    clearTimeout(timer);
    if (remaining <= 0) {
      func.apply(context, args);
      startTime = Date.now();
    } else {
      timer = setTimeout(func, remaining);
    }
  };
};

export default throttle;
