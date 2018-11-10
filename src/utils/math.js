export const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

export const throttle = (func, wait = 100) => {
  let timer = null;
  return function (...args) {
    if (timer === null) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, wait);
    }
  };
};
