
const WebSocket = require('ws');
const managerDB = require('./managerDB');
const { handleAction } = require('./handle_server');

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('✅ Server WebSocket on! port:8080');
});

wss.on('connection', ws => {
	console.log('🟢 Client connected');

	ws.send('Hello from the server');

	ws.on('message', async message => {
		console.log('📤 Message recived:', message);

		let data = JSON.parse(message.toString());
		
		if(data.action != undefined){
			let result = await handleAction(data);
			console.log("📨 Send! + "+JSON.stringify(result));
			ws.send(JSON.stringify(result));
		}else{
			let val = {status:300, response: 'Invalid action!' };
			ws.send(JSON.stringify(val));
		}

	});

	ws.on('close', () => {
		console.log('🔴 Client disconnected');
	});
});


