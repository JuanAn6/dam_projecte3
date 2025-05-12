const managerDB = require('./managerDBMatch');

function startMatch(data , sendToClient) {

    let sala_id = data.info.sala;

    managerDB.getPlayersInfoFromSala(sala_id).then((players) => {
        for(let i = 0 ; i < players.length; i++){
            let session = getSessionByUserId(players[i].id);
            if(session != null){       
                sendToClient(session.uid, {action: 'start_match', start: 1 });
            }
        }
    });


    UPDATE THE SALA TO STATUS 

}

module.exports = { startMatch };