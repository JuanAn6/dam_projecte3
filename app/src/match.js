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

    managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id).then( async (players) => {
        //Status 2 col·locacio inicial!
        await matchDB.updateSalaStatusTorn(sala_id, 2);
        let sala;        
        if(players.length > 0 ){
            await matchDB.updateSalaPlayerTorn(sala_id, players[0].skfUser_id);
            sala = await managerDB.getSalaById(sala_id);
            
            for(let i = 0 ; i < players.length; i++){
                await matchDB.SetTropesPlayerByPlayerId(players[i].id, 35);
            }
        }

        for(let i = 0 ; i < players.length; i++){
            let session = await managerDB.getSessionByUserId(players[i].skfUser_id);
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

/**
 * Brodcast to every player at the sala
 * @param {*} action 
 * @param {*} sala_id 
 * @param {*} sendToClient 
 * @param {*} info 
 */
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


/**
 * Check if the user who has done the action 
 * @param {*} token 
 * @param {*} sala_id 
 * @param {*} sala 
 * @returns 
 */
async function checkValidUserTorn(token, sala_id = null, sala = null){
    if(sala == null){
        sala = await managerDB.getSalaById(sala_id);
    }

    let session = await managerDB.getSessionByToken(token);
    if(session == null) return false;

    return sala.torn_player_id == session.usuari_id;
}

/**
 * Check if the sala has the valid status for the action!
 * @param {*} sala_id 
 * @param {*} sala 
 * @param {*} status 
 * @returns 
 */
async function checkSalaStateIsAtThePhase(sala_id = null, sala = null, status){
    if(sala == null){
        sala = await managerDB.getSalaById(sala_id);
    }

    return sala.estat_torn == status;
}


/**
 * Increments the torn of the player to the next in the list
 * Always starts with the admin and then folows the number order at database.
 * @param {*} sala_id 
 */
async function incrementPlayerTorn(sala_id) {
    let sala = await managerDB.getSalaById(sala_id);
    let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);

    let actual_index = players.findIndex((ele) => ele.skfUser_id == sala.torn_player_id );    
    let new_index = (actual_index+1) % players.length;

    await matchDB.updateSalaPlayerTorn(sala_id, players[new_index].skfUser_id);
    
    console.log("PLAYER TORN UPDATED: ", players[new_index]);

}


/**
 * Return the global status of the map.
 * @param {*} sala_id 
 * @returns 
 */
async function getGlobalStateSala(sala_id) {

    let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);
    let obj_response = [];
    
    for(let i = 0 ; i < players.length; i++){    
        let countries = await matchDB.getCountrysFromPlayer(players[i].id);
        obj_response.push({ player_id: players[i].skfUser_id, countries: countries });    
    }

    return obj_response;

}

/**
 * Check if the player can "deploy" a trope in the country, depends if all countries are fill with at least one trope or is empty.
 * If all the countries are filled if is the owner of the country.
 * @param {*} player_id 
 * @param {*} country 
 * @param {*} sala_id 
 * @returns {Boolean}
 */

async function checkIfCanDeploy(player_id, country, sala_id){

    let count_pais = await matchDB.countCountrysWithTrops(sala_id);
    if(count_pais > 41){ //41 El numero de paises
        //check if the player has the country and add the trope
        let own = await matchDB.checkCountryOwner(player_id, country);
        return own;
    }else{
        //check if is an empty country!!!
        let empty = await matchDB.checkCountryEmpty(sala_id, country);
        return empty == 0;
    }

}
        

/**
 * Fase deploy must to be sala status 2
 * @param {*} data 
 * @param {*} sendToClient 
 */

async function faseDeploy(data, sendToClient) {
    let sala_id = data.info.sala;
    let sala = await managerDB.getSalaById(sala_id);
    let token = data.token;
    //Checks necessaris que es abans de començar cada fase
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 2);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    if(valid_state && valid_user){
        let player = await matchDB.getPLayerByUserId(sala.torn_player_id, sala_id);
        
        if(player.tropes > 0){
            let can_deploy = await checkIfCanDeploy(player.id, data.info.country, sala_id);
            
            if(can_deploy){
                await matchDB.InsertUpdateOkupaCountry(player.id, data.info.country, 1);
                await matchDB.SetTropesPlayerByPlayerId(player.id, player.tropes-1 );
                //Incrementar el turno del player
                await incrementPlayerTorn(sala_id);
            }

        }else{
    
            //Check the troops of the players to switch to the new stage of the match!
            let players = await managerDB.getPlayersInfoFromSala(sala_id);
            if(players.every((p) => p.tropes == 0)){
                //Status 3 first combat!!!
                await matchDB.updateSalaStatusTorn(sala_id, 3);
                //Incrementar el turno del player
                await incrementPlayerTorn(sala_id);

                //Recojer el estado global de la sala para enviar
                let status_sala = await getGlobalStateSala(sala_id);
                
                //Calculate the number of trops is for the player
                let troops = await numberOfTroopsDeployCombat(sala_id);
                console.log("CHANGE ATTACK PHASE!");
                sendStatusGlobalSala('deploy_combat', sala_id, sendToClient, { n_tropes: troops, setup: status_sala});
                return;

            }else{
                //Incrementar el turno del player
                await incrementPlayerTorn(sala_id);
            }

        }

        //Recojer el estado global de la sala para enviar
        let status_sala = await getGlobalStateSala(sala_id);
        console.log("STATUS SALA: ",status_sala);
        sendStatusGlobalSala('deploy', sala_id, sendToClient, { setup: status_sala });

    }


}



//FASE ATTACK

/**
 * Return the number of troops of the active player can place in the map
 *  (count of troops / 3) trunc
 * @param sala_id {*}
 * @return {number}
 */
async function numberOfTroopsDeployCombat(sala_id){
    let sala = await matchDB.getSalaById(sala_id);
    let players = await managerDB.getPlayersInfoFromSala(sala_id);
    let player = players.find((p) => p.skfUser_id == sala.torn_player_id );

    let troops = await matchDB.getPlayerTroops(player.id);
    troops = Math.floor(troops / 3);
    console.log("TROPES DEL PLAYER: ", troops);
    
    //Update the number of troops the player can place, to after can check it
    await matchDB.SetTropesPlayerByPlayerId(player.id, troops);

    return troops;

}


/**
 * FASE 3
 * 
 * Fase deploy new troops!
 * If the player didnt send at the same time all the troops he can place they are gona be discard!
 * @param {*} data 
 * @param {*} sendToClient 
 */
async function faseDeployCombat(data, sendToClient){

    let sala_id = data.info.sala;
    let sala = await managerDB.getSalaById(sala_id);
    let token = data.token;

    //Checks necessaris que es abans de començar cada fase
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 2);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    if(valid_state && valid_user){
        //Check if the player can place the sum of the number of troops, if cant place dont place and change to another player torn
        let session = await managerDB.getSessionByToken(token);
        let player = await matchDB.getPLayerByUserId(session.usuari_id);
        let troops = await matchDB.getPlayerTroops(player.id);
        let sum_troops = data.info.deploy.reduce((acum, d) => acum + d.troops, 0);
        console.log("TOTAL DE TROPES PER INSERTAR: ", sum_troops);
        
        if(troops >= sum_troops){

            //Change the countrys, only if the check is valid!
            for(let i = 0; i < data.info.deploy.length ; i++){
                let own = await matchDB.checkCountryOwner(player.id, country);
                if(own){
                    await matchDB.InsertUpdateOkupaCountry(player.id, data.info.deploy[i].country, data.info.deploy[i].troops);
                }
            }

        }
        
        //Update player troops to 0
        await matchDB.SetTropesPlayerByPlayerId(player.id, 0);

        //Change to the new mig phase
        await matchDB.updateSalaStatusTorn(sala_id, 4);

        //Send the new status to everyone
        let status_sala = await getGlobalStateSala(sala_id);
        console.log("STATUS SALA: ",status_sala);
        sendStatusGlobalSala('attack', sala_id, sendToClient, { setup: status_sala });

    }

    

}


/**
 * Generate the random dice in base a the tpe of the country and the troops
 * 
 *  atacante: 
 *  tropas - dados
 *  2 - 1;
 *  3 - 2;
 *  4 o mas - 3;
 * 
 *  defensor:
 *  tropas - dados 
 *  1 - 1;
 *  2 o mas - 2;
 *                 
 * @param {int} troops
 * @param {string} type type of the country, "defender", "attacker"
 * @return array of ints
 */
function generateRandomDice(troops, type){

    let max = 0;
    if(type == "attacker"){
        max = troops <= 3 && troops > 0 ? troops : 1;
    }else if(type == "defender"){
        max = troops <= 2 && troops > 0 ? troops : 1;
    }

    let nums = [];
    for(let i = 0; i < max; i++){
        let randomInt = Math.floor(Math.random() * 6) + 1;
        nums.push(randomInt);
    }
    
    return nums;
}


/**
 * FASE 4
 * 
 * Fase attack 
 * @param {*} data 
 * @param {*} sendToClient 
 */
async function faseAttackCombat(data, sendToClient){

    //Check player is vaid
    let sala_id = data.info.sala;
    let sala = await managerDB.getSalaById(sala_id);
    let token = data.token;

    //Checks necessaris que es abans de començar cada fase
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 2);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    if(valid_state && valid_user){
        let attaker = data.info.attaker;
        let defender = data.info.attaker;
        let troops = data.info.troops;
        let next_fase = false;

        if(attaker == undefined || defender == undefined || troops == undefined){
            return;
        }

        //Cehck if is the owner of the country!
        let attaker_own = await matchDB.checkCountryOwner(player.id, attaker);
        let defender_own = await matchDB.checkCountryOwner(player.id, defender);

        if(attaker_own && !defender_own){
            //Check if the countrys are neighbours and can attack

            let neighbours = matchDB.checkIfTheyAreNeighbours(attaker, defender);
            if(neighbours){
                //Generate the roll of the dice

                let pais_attaker = matchDB.getPaisByAbr(attaker);
                
                if(pais_attaker.tropes > troops){
                    let pais_defender = matchDB.getPaisByAbr(defender);
                    
                   
                    let attacker_dice = generateRandomDice(troops, 'attacker');
                    let defender_dice = generateRandomDice(pais_defender.tropes, 'defender');


                    /*
                        Se restan tropas en funcion de quien gana y quien pierde por los dados, 
                        Si el atacante ataca con 3 dados se queda con los dos mas altos y el defensor con los suyos
                        Entonces se comparan por orden los mas alto con los mas altos,
                        En caso de empate los dos pierden una tropa,
                        En caso de perder solo pierde una tropa el que pierde,
                        Se hace por cada dado jugado (max 2)
                        Ej:
                            3 - 3
                            2 - 1
                        El defensor pierde 2 y el atacante 1
                            
                            4 - 5
                            2 - 3
                            1
                        El atacante pierde 2 tropas y el defensor ninguna
                        ...
                    */

                    


                    next_fase = true;
                    //Change all the countrys
                

                
                }
            }
        }
        
        if(next_fase){
            //Check if game finish!

        }


        //Send it
        /*
            attacker:{
                country:JP
                dice:{n,n,n}
                troops:N,
                player_id: id
                },
            defender:{
                country:UA, 
                dice_defender:{n,n}
                troops:N,
                player_id: id
                },
        */

        let fase = next_fase ? 'reinforce' : 'attack';
        //Send the new status to everyone
        let status_sala = await getGlobalStateSala(sala_id);
        console.log("STATUS SALA: ",status_sala);
        sendStatusGlobalSala(fase, sala_id, sendToClient, { setup: status_sala });

    }
    
}



/**
 * FASE 5
 * 
 * Fase reinforce 
 * @param {*} data 
 * @param {*} sendToClient 
 */
async function faseReinforceCombat(data, sendToClient){
    let sala_id = data.info.sala;
    let sala = await managerDB.getSalaById(sala_id);
    let token = data.token;

    //Checks necessaris que es abans de començar cada fase
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 2);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    if(valid_state && valid_user){

        //Check if the owner is the player



        //Check if has enough toops in the country


        //Check if the destination is the owner


        //Check if the countris has a path to go


        //Move everything


        //Change the player torn and calculate the new troops can place this one

        

    }



}


/**
 * Change the internal phase of attacking turn
 * parece que solo lo necesitaremos en la fase de ataque para que todos los usuarios vean que esta pasando y saber cuando el usaurio quiere cambiar
 * 
 */

async function chagenFaseCombat(data, sendToClient){

    //Check if is the player 

    //Change the phase
    
}



//FASE 7 game finish!










module.exports = { startMatch, faseDeploy, faseDeployCombat, faseAttackCombat, faseReinforceCombat, chagenFaseCombat };