const Wrappers = {


  debounce(f, ms) {
    let timerId = null;
    return function(...args) {
      if (timerId != null) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(f.bind(this), ms, ...args);
    }
  }

};

export default Wrappers;