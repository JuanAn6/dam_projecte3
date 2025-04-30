const GLOBAL = require('../src/data');
const MENU = require('../src/menu');

const handleAction = async(data) => {
    let obj;
    let aux = null;
    switch(data.action){
        case 'login': 
            obj = await MENU.login(data.login.user, data.login.password);
            break;
        
        //MENU
        case 'lobbys':
            obj = await GLOBAL.getSalas(data);
            break;
        case 'create_lobby':
            obj = await MENU.createSala(data);
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

module.exports = {
    handleAction
};