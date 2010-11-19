var jade = require('jade'),
	connect = require('connect'),
	meryl = require('meryl');

var opts = {
	port: 8124,
	templateDir: 'templates',
	templateExt: '.jade',
	templateFunc: function (src, data) {
    	return jade.render(src, {locals: data});
	}
};

meryl.p(
	connect.staticProvider()
)

meryl.h('GET /', function (req, resp) {
	resp.render('layout',
		{content: 'home', context:{channel:"main"}}
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

//File static provider at /public
meryl.h('GET /public/', function(req, resp) {
	connect.staticProvider()
});

meryl.run(opts);
console.log('Server running at http://127.0.0.1:8124/');
