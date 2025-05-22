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
    console.log(new_index, actual_index, players);
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
            let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);
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
    let sala = await managerDB.getSalaById(sala_id);
    let players = await managerDB.getInfoPlayersSalaUltimateNoBugs(sala_id);
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
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 3);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    if(valid_state && valid_user){
        //Check if the player can place the sum of the number of troops, if cant place dont place and change to another player torn
        let session = await managerDB.getSessionByToken(token);
        let player = await matchDB.getPLayerByUserId(session.usuari_id, sala_id);
        let troops = player.tropes;
        let sum_troops = data.info.deploy.reduce((acum, d) => acum + d.tropes, 0);
        console.log("TOTAL DE TROPES PER INSERTAR: ", sum_troops);
        
        if(troops >= sum_troops){

            //Change the countrys, only if the check is valid!
            for(let i = 0; i < data.info.deploy.length ; i++){
                let own = await matchDB.checkCountryOwner(player.id, data.info.deploy[i].country);
                if(own){
                    await matchDB.InsertUpdateOkupaCountry(player.id, data.info.deploy[i].country, data.info.deploy[i].tropes);
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

    }else{
        console.log("REQUEST NOT VALID!");
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
    
    if(type == "defender"){
        if(troops >= 2){
            max = 2;
        }else{
            max = 1;
        }
    }else if(type=="attacker"){
        if(troops >= 3){
            max = 3;
        }else if(troops > 1){
            max = 2;
        }else{
            max = 1;
        }
    }

    let nums = [];
    for(let i = 0; i < max; i++){
        let randomInt = Math.floor(Math.random() * 6) + 1;
        nums.push(randomInt);
    }

    nums = nums.sort((a,b) => b - a);
    
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
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 4);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);
    console.log("VALID STATE USER", valid_state, valid_user);

    if(valid_state && valid_user){
        let session = await managerDB.getSessionByToken(token);
        let player = await matchDB.getPLayerByUserId(session.usuari_id, sala_id);

        let attacker = data.info.attacker;
        let defender = data.info.defender;
        let troops = data.info.troops;
        let attack_done = false;

        if(attacker == undefined || defender == undefined || troops == undefined){
            return;
        }

        let info_global = {};

        //Cehck if is the owner of the country!
        let attacker_own = await matchDB.checkCountryOwner(player.id, attacker);
        let defender_own = await matchDB.checkCountryOwner(player.id, defender);

        console.log("ATTACKER_OWN", attacker_own, "Defender_own", defender_own);
        if(attacker_own && !defender_own){
            //Check if the countrys are neighbours and can attack

            let neighbours = await matchDB.checkIfTheyAreNeighbours(attacker, defender);
            console.log("neighbours: ", neighbours, attacker, defender);
            if(neighbours){
                //Generate the roll of the dice

                let pais_attacker = await matchDB.getPaisByAbr(attacker);
                pais_attacker = await matchDB.getCountryByIdAndSalaId(pais_attacker.id, sala_id);

                console.log("PAIS_ATTACKER", pais_attacker, troops);
                if(pais_attacker.tropes > troops){
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
                    let pais_defender = await matchDB.getPaisByAbr(defender);
                    pais_defender = await matchDB.getCountryByIdAndSalaId(pais_defender.id, sala_id);
                    
                   
                    let attacker_dice = generateRandomDice(troops, 'attacker');
                    let defender_dice = generateRandomDice(pais_defender.tropes, 'defender');


                    console.log("attacker_dice", attacker_dice);
                    console.log("defender_dice", defender_dice);

                    //TO DO logica de los dados
                    let aux = defender_dice.length > attacker_dice.length ? attacker_dice.length : defender_dice.length;

                    for(let i = 0; i < aux; i++){

                        if(attacker_dice[i] > defender_dice[i]){
                            defender_troops--;
                        }else{
                            attack_troops--;
                        }

                    }

                    //Normalize the troops of the attacker
                    attack_troops = (pais_attacker.troops - troops) + attack_troops;

                    console.log("attack_troops", attack_troops);
                    console.log("defender_troops", defender_troops);
                    
                    //Change all the countrys
                    if(defender_troops == 0){
                        attack_done = true;

                        await matchDB.updatePaisPlayerAndTroops(pais_attacker.pais_id, null, pais_attacker.player_id, attack_troops);
                        await matchDB.updatePaisPlayerAndTroops(pais_defender.pais_id, player.id, pais_defender.player_id, defender_troops);
                        
                        //Send client the new phase status!!! and wait to change the country troops
                        let status_sala = await getGlobalStateSala(sala_id);
                        let info = {
                            setup: status_sala,
                            attacker:{
                                country:pais_attacker.abr,
                                dice:attacker_dice,
                                troops:attack_troops,
                                player_id: player.id,
                            },
                            defender:{
                                country:pais_defender.abr,
                                dice:defender_dice,
                                troops:defender_troops,
                                player_id: player.id,
                            }
                        }

                        sendToClient(session.uid, { response:{ fase: 'attack', active_player: sala.torn_player_id, info: info } })

                        //Change to the new mig phase
                        await matchDB.updateSalaStatusTorn(sala_id, 5);

                    }else{
                        
                        await matchDB.updatePaisPlayerAndTroops(pais_attacker.pais_id, null, pais_attacker.player_id, attack_troops);
                        await matchDB.updatePaisPlayerAndTroops(pais_defender.pais_id, null, pais_defender.player_id, defender_troops);
                        
                        //Send the new status to everyone
                        let status_sala = await getGlobalStateSala(sala_id);
                        info_global = {
                            setup: status_sala,
                            attacker:{
                                country:pais_attacker.abr,
                                dice:attacker_dice,
                                troops:attack_troops,
                                player_id: player.id,
                            },
                            defender:{
                                country:pais_defender.abr,
                                dice:defender_dice,
                                troops:defender_troops,
                                player_id: player.id,
                            }
                        }

                        //Change to the new mig phase
                        await matchDB.updateSalaStatusTorn(sala_id, 4);

                    }
                    
                    
                }
            }
        }
        
        if(attack_done){
            //Check if game finish!
            console.log("CHECK GAME FINISH");

        }


        if(!attack_done){
            console.log("STATUS SALA: ",status_sala);
            sendStatusGlobalSala('attack', sala_id, sendToClient, info_global );
        }

    }
    
}


/**
 * FASE 5
 * 
 * Fase move if conquest some country 
 * @param {*} data 
 * @param {*} sendToClient 
 */
async function faseMoveCombat(data, sendToClient){
    let sala_id = data.info.sala;
    let sala = await managerDB.getSalaById(sala_id);
    let token = data.token;

    //Checks necessaris que es abans de començar cada fase
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 5);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    if(valid_state && valid_user){
        let session = await managerDB.getSessionByToken(token);
        let player = await matchDB.getPLayerByUserId(session.usuari_id, sala_id);

        //     {
        // action:''attack_reinforce",
        // info:{
        //         sala: sala_id,
        //         from: JP,
        //         to: EA,
        //         troops: N
        //         }  
        //}

        let from_own = await matchDB.checkCountryOwner(player.id, data.info.from);
        let to_own = await matchDB.checkCountryOwner(player.id, data.info.to);

        if(from_own && !to_own){
            //Check if the countrys are neighbours and can attack

            let neighbours = await matchDB.checkIfTheyAreNeighbours( data.info.from, data.info.to);
            if(neighbours){
                //Generate the roll of the dice

                let pais_from = await matchDB.getPaisByAbr(data.info.from);
                pais_from = await matchDB.getCountryByIdAndSalaId(pais_from.id, sala_id);

                let pais_to = await matchDB.getPaisByAbr(data.info.to);
                pais_to = await matchDB.getCountryByIdAndSalaId(pais_to.id, sala_id);

                //Check if has enough toops in the country
                let troops = data.info.troops;
                if(pais_from.tropes - troops >= 1 && pais_to.tropes == 0){
                    //Move everything
                    await matchDB.InsertUpdateOkupaCountry(player.id, pais_from.id, (troops*-1))
                    await matchDB.InsertUpdateOkupaCountry(player.id, pais_to.id, troops)

                    //Send the new status to everyone
                    let status_sala = await getGlobalStateSala(sala_id);
                    console.log("STATUS SALA: ",status_sala);
                    sendStatusGlobalSala('attack', sala_id, sendToClient, {setup : status_sala} );

                    //Change to the new mig phase
                    await matchDB.updateSalaStatusTorn(sala_id, 4);

                }else{

                    //Send the new status to everyone
                    let status_sala = await getGlobalStateSala(sala_id);
                    console.log("STATUS SALA: ",status_sala);
                    sendStatusGlobalSala('reinforce', sala_id, sendToClient, {setup : status_sala} );

                    //Change to the new mig phase
                    //await matchDB.updateSalaStatusTorn(sala_id, 5);

                }

            }

        }

        

    }

}



/**
 * FASE 6
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
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 6);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    if(valid_state && valid_user){
        let session = await managerDB.getSessionByToken(token);
        let player = await matchDB.getPLayerByUserId(session.usuari_id, sala_id);

        const from = data.info.from;
        const to = data.info.to;
        const troops = data.info.troops;

        // 1. Check if the owner is the player
        const from_own = await matchDB.checkCountryOwner(player.id, from);
        const to_own = await matchDB.checkCountryOwner(player.id, to);

        // 2. Check if has enough troops in the country
        const pais_from = await matchDB.getPaisByAbr(from);
        const okupa_from = await matchDB.getCountryByIdAndSalaId(pais_from.id, sala_id);

        if (from_own && to_own && okupa_from.tropes > troops && troops > 0) {
            // 3. Check if the countries has a path to go
            const pathExists = await matchDB.hasPathBetweenCountries(player.id, from, to, sala_id);

            if (pathExists) {
                // 4. Move everything
                await matchDB.InsertUpdateOkupaCountry(player.id, from, -troops);
                await matchDB.InsertUpdateOkupaCountry(player.id, to, troops);

                // 5. Change the player turn and calculate the new troops
                await incrementPlayerTorn(sala_id);
                // (Opcional: recalcular tropas si es necesario)

                // 6. Enviar estado actualizado
                let status_sala = await getGlobalStateSala(sala_id);
                sendStatusGlobalSala('deploy', sala_id, sendToClient, { setup: status_sala });
            }
        }
    }
}


/**
 * Change the internal phase of attacking turn
 * parece que solo lo necesitaremos en la fase de ataque para que todos los usuarios vean que esta pasando y saber cuando el usaurio quiere cambiar
 * @param {*} data
 * @param {*} sendToClient
 */

async function chagenFaseCombat(data, sendToClient){
    let sala_id = data.info.sala;
    let sala = await managerDB.getSalaById(sala_id);
    let token = data.token;

    //Checks necessaris que es abans de començar cada fase
    let valid_state = await checkSalaStateIsAtThePhase(null, sala, 4);
    let valid_user = await checkValidUserTorn(token, sala_id, sala);

    //Check if is the player 
    if(valid_state && valid_user){

        //Change the phase
        await matchDB.updateSalaStatusTorn(sala_id, 5);

        //Send the new status to everyone
        let status_sala = await getGlobalStateSala(sala_id);
        console.log("STATUS SALA: ",status_sala);
        sendStatusGlobalSala('reinforce', sala_id, sendToClient, {setup : status_sala} );

    }
}



//FASE 7 game finish!






module.exports = { startMatch, faseDeploy, faseDeployCombat, faseAttackCombat, faseReinforceCombat, chagenFaseCombat, faseMoveCombat };