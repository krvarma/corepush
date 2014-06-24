var apn = require('apn');
var http=require('http');
var url=require('url');

var token = "e35a16bed9ba5fcbaade93d110e96a8485ce21c8e1b50e4c6f46ecc50f88c50a"
var options = { };
var apnConnection = new apn.Connection(options);
var myDevice = new apn.Device(token);
var note = new apn.Notification();

function sendPush(){
	note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
	note.badge = 0;
	note.sound = "ping.aiff";
	note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
	note.payload = {'messageFrom': 'Spark Device'};

	apnConnection.pushNotification(note, myDevice);
}

var server=http.createServer(function(req,res){
    var pathname=url.parse(req.url).pathname;
    switch(pathname){
        case '/sendpush':{
			sendPush();
			res.writeHead(200, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
            res.end('sendpush');
			
			break;
		}
        default:{
			res.writeHead(200, {'Content-Length': body.length, 'Content-Type': 'text/plain' });
            res.end('default');
			break;
		}
    }

}).listen(8080);