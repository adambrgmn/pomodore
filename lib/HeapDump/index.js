/**
 * Simple userland heapdump generator using v8-profiler
 * Usage: require('[path_to]/HeapDump').init('datadir')
 *
 * @module HeapDump
 * @type {exports}
 */

const debug = require('debug')('heapdump');
const fs = require('fs');
const rimraf = require('rimraf');
const profiler = require('v8-profiler');
const path = require('path');
let _datadir = null;
let nextMBThreshold = 0;

/**
 * Saves a given snapshot
 *
 * @param snapshot Snapshot object
 * @param datadir Location to save to
 */
function saveHeapSnapshot(snapshot, datadir) {
  let buffer = '';
  const stamp = Date.now();
  snapshot.serialize((data, length) => {
    buffer += data;
  }, () => {
    const name = `${stamp}.heapsnapshot`;
    const dir = path.join(datadir, name);
    fs.writeFile(dir, buffer, (err) => {
      if (err) throw err;
      debug(`Heap snapshot written to: ${datadir}/${name}`);
    });
  });
}

/**
 * Creates a heap dump if the currently memory threshold is exceeded
 */
function heapDump() {
  const memMB = process.memoryUsage().rss / 1048576;

  if (memMB > nextMBThreshold) {
    debug('Current memory usage: %j', process.memoryUsage());
    nextMBThreshold += 50;
    const snap = profiler.takeSnapshot('profile');
    saveHeapSnapshot(snap, _datadir);
  }
}

/**
 * Schedule a heapdump by the end of next tick
 */
function tickHeapDump() {
  setImmediate(() => {
    heapDump();
  });
}

/**
 * Init and scheule heap dump runs
 *
 * @param datadir Folder to save the data to
 */
module.exports.init = (datadir) => {
  _datadir = datadir;
  rimraf('**/logs/*.heapsnapshot', (err) => {
    if (err) throw err;
    setInterval(tickHeapDump, 500);
  });
};
