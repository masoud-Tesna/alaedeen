let createHost = require('cross-domain-storage/host');

let accessStoragePage = createHost([
  {
    origin: 'http://localhost:3000',
    allowedMethods: ['get', 'set', 'remove'],
  }
]);

export { accessStoragePage };
