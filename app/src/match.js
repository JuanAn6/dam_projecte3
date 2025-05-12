const matchDB = require('../server/managerDBMatch');
const managerDB = require('../server/managerDB');

async function startMatch(data , sendToClient) {

    if(data.info.sala == undefined || data.info.sala == null){
        console.error("Error: Sala ID is undefined or null");
        return {status : 4000, response : false, message: "Error: Sala ID is undefined or null"};
    }

    let sala_id = data.info.sala;

    let sala = await managerDB.getSalaById(sala_id);
    let session = await managerDB.getSessionByToken(data.token);

    if(session.usuari_id != sala.admin_id){
        console.error("Error: User does not have permission to start the match");
        return { status : 4000, response : false, message: "Error: User does not have permission to start the match"};
    }

    //Status 2 col·locacio inicial!
    matchDB.updateSalaStatusTorn(sala_id, 2).then(() => {
        console.log("Sala status updated to 2");
    }).catch((error) => {
        console.error("Error updating sala status:", error);
    });

    managerDB.getPlayersInfoFromSala(sala_id).then( async (players) => {
        for(let i = 0 ; i < players.length; i++){
            let session = await managerDB.getSessionByUserId(players[i].id);
            if(session != null){       
                sendToClient(session.uid, {action: 'start_match', response: {start: 1}});
            }
        }
    });

    return {status : 200};//, message: "Match started successfully", response: { start : 1 }};

}

module.exports = { startMatch };