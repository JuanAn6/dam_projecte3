const matchDB = require('../server/managerDBMatch');
const managerDB = require('../server/managerDB');

async function startMatch(data , sendToClient) {

    if(data.info.sala == undefined || data.info.sala == null){
        console.error("Error: Sala ID is undefined or null");
        return {status : 4000, response : false, message: "Error: Sala ID is undefined or null"};
    }

    let sala_id = data.info.sala;
    let session = await managerDB.getSessionByToken(data.token);
    let aux_sala = await managerDB.getSalaById(sala_id);

    if(session.usuari_id != aux_sala.admin_id){
        console.error("Error: User does not have permission to start the match");
        return { status : 4000, response : false, message: "Error: User does not have permission to start the match"};
    }

    managerDB.getPlayersInfoFromSala(sala_id).then( async (players) => {
        //Status 2 col·locacio inicial!
        await matchDB.updateSalaStatusTorn(sala_id, 2);
        let sala;        
        if(players.length > 0 ){
            await matchDB.updateSalaPlayerTorn(sala_id, players[0].id);
            sala = await managerDB.getSalaById(sala_id);
        }

        for(let i = 0 ; i < players.length; i++){
            let session = await managerDB.getSessionByUserId(players[i].id);
            if(session != null){
                sendToClient(session.uid, {action: 'start_match', response: {start: 1, sala: sala}});
            }
        }

        //Send status to the clients
        sendStatusGlobalSala('deploy', sala_id, sendToClient);

    }).catch((error) => {
        console.error("Error updating sala player torn:", error);
    });


   return {status : 200};//, message: "Match started successfully", response: { start : 1 }};
 
}


async function sendStatusGlobalSala(action, sala_id, sendToClient, info){
    let sala = await managerDB.getSalaById(sala_id);

    let players = await managerDB.getPlayersInfoFromSala(sala_id);
    
    for(let i = 0 ; i < players.length; i++){
        let session = await managerDB.getSessionByUserId(players[i].id);
        if(session != null){
            sendToClient(session.uid, { response:{ fase: action, active_player: sala.torn_player_id, info: info } });
        }
    }

}

async function faseDeploy(data, sendToClient) {

    let sala_id = data.info.sala;
    let sala = await managerDB.getSalaById(sala_id);
    let player = await matchDB.getPLayerByUserId(sala.torn_player_id, sala_id);
    
    console.log("Get fase Deploy!!!", data, sala, player);
    
    await matchDB.InsertUpdateOkupaCountry(player.id, data.info.country, 1);

    //Incrementar el turno del player


    //Recojer el estado global de la sala para enviar
    let status_sala = await getGlobalStateSala(sala_id);
    
    console.log("STATUS SALA: ",status_sala);

    sendStatusGlobalSala('deploy', sala_id, sendToClient, { setup: status_sala })

}



async function getGlobalStateSala(sala_id) {

    let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);
    let obj_response = [];
    
    for(let i = 0 ; i < players.length; i++){    
        let countries = await matchDB.getCountrysFromPlayer(players[i].id);
        obj_response.push({ player_id: players[i].skfUser_id, countries: countries });    
    }

    return obj_response;

}

module.exports = { startMatch, faseDeploy };