const Wrappers = {


  debounce(f, ms) {
    let timerId = null;
    return function(...args) {
      if (timerId != null) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(f.bind(this), ms, ...args);
    }
  },

  cacheble(f) {
    let cache = new Map();

    return function (...args) {
      if (args.length == 0 || args.length > 1) {
        throw new Error("Unsupported number of arguments. Expected only one argument.");
      }

      let result = cache.get(args[0]);
      if (result == null) {
        result = f.call(this, ...args);
        cache.set(args[0], result);
      }

      return result;
    }
  }

};

export default Wrappers;