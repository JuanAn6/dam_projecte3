
const WebSocket = require('ws');
const managerDB = require('./managerDB');
const menu = require('../src/menu');

const { handleAction } = require('./handle_server');

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('✅ Server WebSocket on! port:8080');
});

wss.on('connection', ws => {
	console.log('🟢 Client connected');

	ws.send(JSON.stringify({success:200, response:'Hello from the server' }));

	ws.on('message', async message => {
		try{

			console.log('📤 Message recived:'+message.toString());
			
			let data = JSON.parse(message.toString());
			
			if(data.action != undefined && data.action != 'login'){
				let token = data.token;
				if(token == undefined || token == null || token == ''){
					let val = {status: 401, response: 'Token not found!' };
					ws.send(JSON.stringify(val));
					return;
				}else{
					let check = await menu.checkToken(token);
					if(check == false){
						let val = {status: 401, response: 'Token invalid!' };
						ws.send(JSON.stringify(val));
						return;
					}else{
						console.log("Token valid! "+token);
						let result = await handleAction(data);
						console.log("📨 Send! + "+JSON.stringify(result));
						ws.send(JSON.stringify(result));
					}
				}
			}else if (data.action == 'login'){
				let result = await handleAction(data);
				console.log("📨 Send! + "+JSON.stringify(result))
				ws.send(JSON.stringify(result));
			}else{
				let val = {status:300, response: 'Invalid action!' };
				ws.send(JSON.stringify(val));
			}

		}catch(e){
			console.log('❌ Error! '+e.message);
			return {status: 500, response: 'Error at server! '+e.message };
		}

	});

	ws.on('close', () => {
		console.log('🔴 Client disconnected');
	});
});


