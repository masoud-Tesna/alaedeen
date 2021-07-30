let createHost = require('cross-domain-storage/host');

let accessStoragePage = createHost([
  {
    origin: 'http://localhost:3000',
    allowedMethods: ['get', 'set', 'remove'],
  },
  {
    origin: 'http://localhost:3001',
    allowedMethods: ['get', 'set', 'remove'],
  },
  {
    origin: 'https://hornb2b.com',
    allowedMethods: ['get', 'set', 'remove'],
  },
  {
    origin: 'https://store.hornb2b.com',
    allowedMethods: ['get', 'set', 'remove'],
  }
]);

export { accessStoragePage };
