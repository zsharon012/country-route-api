const borders = require('./borders');

function findPath(destination, start = 'USA', graph = borders) {
  if (!graph[start] || !graph[destination]) return null;

  const parent = new Map([[start, null]]);
  const queue = [start];

  while (queue.length > 0) {
    const current = queue.shift();
    if (current === destination) break;
    for (const neighbor of graph[current]) {
      if (!parent.has(neighbor)) {
        parent.set(neighbor, current);
        queue.push(neighbor);
      }
    }
  }

  if (!parent.has(destination)) return null;

  // walk back from destination to start to rebuild the path.
  const path = [];
  for (let c = destination; c !== null; c = parent.get(c)) path.unshift(c);
  return path;
}

module.exports = { findPath };