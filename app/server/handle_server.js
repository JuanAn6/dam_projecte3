const GLOBAL = require('../src/data');
const MENU = require('../src/menu');
const managerDB = require('./managerDB');
const MATCH = require('../src/match');

const handleAction = async(data, sendToClient) => {
    let obj;
    let aux = null;
    switch(data.action){
        case 'login': 
            obj = await MENU.login(data.login.user, data.login.password, data.clientId);
            break;
        
        //MENU
        case 'lobby':
            obj = await GLOBAL.getSalas(data);
            break;
        case 'create':
            obj = await MENU.createSala(data);
            break;
        case 'join':
            obj = await MENU.joinSala(data, sendToClient);
            break;
        case 'leave_sala':
            obj = await MENU.leaveSala(data, sendToClient);
            break;



        //MATCH
        case 'start_match':
            obj = await MATCH.startMatch(data, sendToClient);
            break;

        case 'deploy':
            await MATCH.faseDeploy(data, sendToClient);
            return null;

        case 'deploy_combat':
            await MATCH.faseDeployCombat(data, sendToClient);
            return null;

        case 'deploy_combat':
            await MATCH.faseAttackCombat(data, sendToClient);
            return null;
        
        case 'reinforce_combat':
            await MATCH.faseReinforceCombat(data, sendToClient);
            return null;


            
        //GLOBAL
        case 'test':
            obj = await managerDB.testDB();
            break;
        case 'countrys':
            obj = await GLOBAL.getCountrys();
            break;
        case 'continents':
            obj = await GLOBAL.getContinents();
            break;

        default:
            return { status: 300, response: 'Unknown action!' };

    }

    return obj;
}


async function checkToken(token, uid){
    if(token != null){

        let session = await managerDB.getSessionByToken(token);

        console.log("session!:", session);

        if(session != null){
            await managerDB.updateSession(token, uid);
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

module.exports = {
    handleAction,
    checkToken
};