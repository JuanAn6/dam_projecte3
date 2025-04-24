const test = require('../src/test');

const handleAction = async(data) => {
    let obj = {status : 200, response: 0 }
    let aux = null;
    switch(data.action){
        case 'test':
            obj.response = await managerDB.testDB();
            return obj;
        case 'countrys':
            aux = await test.getCountrys();
            console.log(aux);
            obj.response = aux;
            return obj;
        case 'continents':
            aux = await test.getContinents();
            console.log(aux);
            obj.response = aux;
            return obj;

        default:
            return { status: 300, response: 'Acción desconocida' };

    }
}

module.exports = {
    handleAction
};