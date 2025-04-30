const managerDB = require("../server/managerDB");
const server = require("../server/server");

async function login(user, password, clientId){

    let obj = {status : 200, response: 0 }
    let aux_user = await managerDB.getUserByLogin(user);
    if(aux_user == null){
        obj.status = 419;
        obj.response = "User not found!";
        return obj;
    }
    else if (aux_user.password != password){
        obj.status = 420;
        obj.response = "Password incorrect!";
        return obj;
    }
    else if (aux_user.password == password){
        let now = new Date();
        let token = aux_user.login+""+now.getTime();
        obj.status = 200;
        obj.response = {message: "Login success!", token: token};  
        
        managerDB.insertUserToken(aux_user.id, token, clientId);
        return obj;
    }

    obj.status = 500;
    obj.response = "User not found!";
    return obj
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


async function createSala(data){
    let obj = {status : 200, response: 0 }

    

    if(data.info.max_players == undefined || data.info.max_players == null){
        data.info.max_players = 6;
    }else if (data.info.max_players >= 1){
        data.info.max_players = 2;
    }else if (data.info.max_players > 6){
        data.info.max_players = 6;
    }

    if(data.info.nom == undefined || data.info.nom == null){
        obj.status = 400;
        obj.response = "Name not found!";
        return obj;
    }

    let now = new Date();
    data.info.date = now;
    data.info.token = data.info.nom.replace(' ','_').trim()+ "" + now.getTime();
    
    let user = await managerDB.getSessionByToken(data.token);
    if(user == null){
        obj.status = 401;
        obj.response = "Token invalid!";
        return obj;
    }
    data.info.admin_id = user.usuari_id;

    result = await managerDB.createSalaDB(data.info);

    if(result == null){
        obj.status = 500;
        obj.response = "Error creating sala!";
        return obj;
    }else{
        obj.response = {message:"Sala created!", sala_id: result.insertId};
        return obj;
    }

}


module.exports = {
    login,checkToken,createSala
};