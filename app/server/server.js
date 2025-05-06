const { v4: uuidv4 } = require('uuid'); // npm install uuid
const WebSocket = require('ws');
const managerDB = require('./managerDB');

const { handleAction, checkToken } = require('./handle_server');

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log('✅ Server WebSocket on! port:8080');
});

const clients = new Map(); // ID -> WebSocket



async function sendToClient(clientId, message) {
	console.log(`📤 Send to client ${clientId}`);
    const client = clients.get(clientId);
    if (client && client.readyState == WebSocket.OPEN) {
        client.send(message);
    } else {
        console.log(`⚠️ Client ${clientId} not connected`);
    }
}

async function showClients() {
	console.log('🟢 Clients connected: ', clients.size);
	clients.forEach( async (client, id) => {
		let clientInfo = await managerDB.getSessionByUid(id);
		console.log(`Client ID: ${id}, Session: ${JSON.stringify(clientInfo)}`);
	});
}



module.exports = {
    clients, sendToClient, showClients
};


wss.on('connection', ws => {
	
    const clientId = uuidv4();
    clients.set(clientId, ws);
    console.log(`🟢 Client connected with ID: ${clientId}`);

	//console.log('Clients', clients);

	ws.send(JSON.stringify({success:200, response:'Hello from the server' }));

	ws.on('message', async message => {
		try{
			
			console.log('📤 Message recived:'+message.toString());
			
			let data = JSON.parse(message.toString());
			
			
			data.clientId = clientId;

			if(data.action != undefined && data.action != 'login'){
				let token = data.token;
				if(token == undefined || token == null || token == ''){
					let val = {status: 401, response: 'Token not found!' };
					ws.send(JSON.stringify(val));
					return;
				}else{
					let check = await checkToken(token, clientId);
					if(check == false){
						let val = {status: 401, response: 'Token invalid!' };
						ws.send(JSON.stringify(val));
						return;
					}else{
						console.log("Token valid! "+token);
						let result = await handleAction(data, sendToClient);
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

			if(data.action != undefined && data.action == 'show_clients'){
				showClients();
			}

		}catch(e){
			console.log('❌ Error at server! '+e.message);
			return {status: 500, response: 'Error at server! '+e.message };
		}

	});

	ws.on('close', () => {
        console.log(`🔴 Client ${clientId} disconnected`);
        clients.delete(clientId);
    });
});


