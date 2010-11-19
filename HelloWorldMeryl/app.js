var meryl = require('meryl');

meryl.h('GET /', function (req, resp) {
      resp.send('Hello, World');
});

meryl.run({port: 8124});

console.log('Server running at http://127.0.0.1:8124/');
