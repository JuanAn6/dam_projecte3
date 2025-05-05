const managerDB = require("../server/managerDB");

async function getCountrys(){
    try{
        let obj = {status : 200, response: 0 };
        obj.response = await managerDB.getCountrysDB();
        return obj;
    }catch(e){
        console.log('❌ Error getCountrys! '+e.message);
        return {status: 500, response: 'Error at server! '+e.message };
    }
}

async function getContinents(){
    try{
        let obj = {status : 200, response: 0 };
        obj.response = await managerDB.getContinentsDB();
        return obj;
    }catch(e){
        console.log('❌ Error getContinents! '+e.message);
        return {status: 500, response: 'Error at server! '+e.message };
    }

}


async function getSalas(){
    try{
        let obj = {status : 200, response: {} };
        obj.response.salas = await managerDB.getSalasDB();
        return obj;
    }catch(e){
        console.log('❌ Error getSalas! '+e.message);
        return {status: 500, response: 'Error at server! '+e.message };
    }

}


module.exports = {
    getCountrys,
    getContinents,
    getSalas,
};