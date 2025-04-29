const managerDB = require("../server/managerDB");

async function getCountrys(){
    return await managerDB.getCountrysDB();
}

async function getContinents(){
    return await managerDB.getContinentsDB();
}


module.exports = {
    getCountrys,getContinents
};