$(document).ready(function(){
	var client = new Faye.Client('http://localhost:8000/faye');

	var subscription = client.subscribe('/channel/'+channel, function(message) {
		$('#messages').prepend('<li>'+message.user +':'+message.text +'</li>')
		console.log(message)
	});

	$('#submit').click(function(){
		var user = $('#user').val();
		var message = $('#message').val();
		if(user && message){
			$('#message').val('')
			client.publish('/channel/'+channel, {text: message, user:user});
		}
	})
})
