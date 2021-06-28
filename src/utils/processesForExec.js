/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-rest-params */
const processesForExec = [];
Object.defineProperty(processesForExec, 'push', {
  enumerable: false, // hide from for...in
  configurable: false, // prevent further meddling...
  writable: false, // see above ^
  async value() {
    for (let i = 0, n = this.length, l = arguments.length; i < l; i++, n++) {
      this[n] = arguments[i];
    }
    if (this.length > 1) return;
    for (let i = 0, n = this.length; i < n; i++) {
      const {func, commitHash, data} = this[0];
      await func(commitHash, data);
      this.shift();
    }
  },
});

module.exports = processesForExec;
