var jade = require('jade'),
	meryl = require('meryl');

var opts = {
	port: 8124,
	templateDir: 'templates',
	templateExt: '.jade',
	templateFunc: function (src, data) {
    	return jade.render(src, {locals: data});
	}
};


meryl.h('GET /', function (req, resp) {
	resp.render('layout',
		{content: 'home', context:{}}
	);
});

meryl.h('GET /channels', function (req, resp) {
	resp.render('layout',
		{content: 'channel', context:{channel:"root"}}
	);
});

meryl.h('GET /channels/{channel}', function (req, resp) {
	resp.render('layout',
		{content: 'channel', context:{channel:req.params.channel}}
	);
});

meryl.run(opts);
console.log('Server running at http://127.0.0.1:8124/');
