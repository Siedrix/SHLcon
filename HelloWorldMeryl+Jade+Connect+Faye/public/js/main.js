$(document).ready(function(){
	$('body').append('/channel/'+channel);
	var client = new Faye.Client('http://localhost:8000/faye');

	var subscription = client.subscribe('/channel/'+channel, function(message) {
		console.log('New person on page');
		console.log(message)
	});

	client.publish('/channel/'+channel, {text: 'Hi there'});
})
