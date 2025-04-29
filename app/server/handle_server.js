const TEST = require('../src/data');
const MENU = require('../src/menu');

const handleAction = async(data) => {
    let obj = {status : 200, response: 0 }
    let aux = null;
    switch(data.action){
        case 'login': 
            console.log(data);
            return await MENU.login(data.login.user, data.login.password);
        
        //MENU

        case 'create':
            return await MENU.createSala(data.menu);

        //TEST
        
        case 'test':
            obj.response = await managerDB.testDB();
            return obj;
        case 'countrys':
            aux = await TEST.getCountrys();
            obj.response = aux;
            return obj;
        case 'continents':
            aux = await TEST.getContinents();
            obj.response = aux;
            return obj;

        default:
            return { status: 300, response: 'Unknown action!' };

    }
}

module.exports = {
    handleAction
};