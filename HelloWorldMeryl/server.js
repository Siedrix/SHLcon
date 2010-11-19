var meryl = require('meryl');

meryl.h('GET /', function (req, resp) {
	resp.send('Hello, World');
});

meryl.h('GET /channels', function (req, resp) {
	resp.send('Yei, We are at channels root');
});

meryl.h('GET /channels/{channel}', function (req, resp) {
	resp.send('Yei, We at channel ' + req.params.channel);
});

meryl.run({port: 8124});

console.log('Server running at http://127.0.0.1:8124/');
