var jade = require('jade'),
	connect = require('connect'),
	http = require('http'),
	faye = require('./lib/faye-node'),
	meryl = require('meryl');

var opts = {
	port: 8124,
	templateDir: 'templates',
	templateExt: '.jade',
	templateFunc: function (src, data) {
    	return jade.render(src, {locals: data});
	}
};

//CouchDb
var	couchdb = require('./lib/couchdb'),
	CDBclient = couchdb.createClient(5984, 'localhost'),
	messages = CDBclient.db('messages');

//Faye
var bayeux = new faye.NodeAdapter({
	mount:    '/faye',
	timeout:  45
});

var server = http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.write('Hello, non-Bayeux request');
  response.end();
});

var incoming = {
	incoming: function(message, callback) {
		if(message.channel.search('meta') < 0){
			messages.saveDoc(message, function(er, ok) {
				if(er){
					sys.puts('weird error');
				}else{
					console.log(message);
				}
			})
		}

		callback(message);
	}
};

bayeux.attach(server);
bayeux.addExtension(incoming);
server.listen(8000);

//Merylz
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
	console.log('/channel/'+req.params.channel);
	messages.view('channels', 'all',{key:'/channel/'+req.params.channel} ,function(er, data) {
		var messages = new Array();
		for(var i in data.rows){
			messages.push(data.rows[i].value);
		}
		resp.render('layout',
			{content: 'channel', context:{channel:req.params.channel,messages:messages}}
		);
	})
});

//File static provider at /public
meryl.h('GET /public/', function(req, resp) {
	connect.staticProvider()
});

meryl.run(opts);
console.log('Server running at http://127.0.0.1:8124/');
