const GLOBAL = require('../src/data');
const MENU = require('../src/menu');
const managerDB = require('./managerDB');

const handleAction = async(data) => {
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
            obj = await MENU.joinSala(data);
            break;
        case 'leave_sala':
            obj = await MENU.leaveSala(data);
            break;
        
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