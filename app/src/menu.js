const managerDB = require("../server/managerDB");
const SERVER = require("../server/server");

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
        obj.response = {message: "Login success!", token: token, id: aux_user.id };  
        
        managerDB.insertUserToken(aux_user.id, token, clientId);
        return obj;
    }

    obj.status = 500;
    obj.response = "User not found!";
    return obj
}




async function createSala(data){
    let obj = {status : 200, response: 0 }

    

    if(data.info.max_players == undefined || data.info.max_players == null){
        data.info.max_players = 6;
    }else if (data.info.max_players <= 1){
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


async function joinSala(data, sendToClient){
    let obj = {status : 200, response: 0 }

    if(data.info.sala == undefined || data.info.sala == null){
        obj.status = 500;
        obj.response = "Sala not found!";
        return obj;
    }

    let players = await managerDB.getPlayersFromSala(data.info.sala);

    let sala = await managerDB.getSalaById(data.info.sala);
    if(sala == null){
        obj.status = 500;
        obj.response = "Sala not found!";
        return obj;
    }

    if(players >= sala.max_players){
        obj.status = 400;
        obj.response = "Sala full!";
        return obj;
    }

    let user = await managerDB.getSessionByToken(data.token);
    if(user == null){
        obj.status = 401;
        obj.response = "Token invalid!";
        return obj;
    }
    
    let result = await managerDB.joinSalaDB(data.info.sala, user.usuari_id, players+1 );

    let players_info = await managerDB.getPlayersInfoFromSala(data.info.sala);
    
    sala = await managerDB.getSalaById(data.info.sala);

    if(result == null){
        obj.status = 500;
        obj.response = "Error joining sala!";
        return obj;
    }else{

        handleUpdatePlayersSala(data.info.sala, sendToClient);
        
        obj.response = {message:"Joined sala!", sala : sala, players: players_info};
        return obj;
    }

}

async function leaveSala(data, sendToClient){
    let obj = {status : 200, response: 0 }

    if(data.info.sala == undefined || data.info.sala == null){
        obj.status = 500;
        obj.response = {message:"Sala not found!", left: -1};;
        return obj;
    }

    let user = await managerDB.getSessionByToken(data.token);
    if(user == null){
        obj.status = 401;
        obj.response = {message:"Token invalid!", left: -1};;
        return obj;
    }
    
    console.log("leave sala:", data.info.sala, user.usuari_id);

    let result = await managerDB.leaveSalaDB(data.info.sala, user.usuari_id);
    
    if(result == null){
        obj.status = 500;
        obj.response = {message:"Error leaving sala!", left: -1};
        return obj;
    }else{
        
        handleUpdatePlayersSala(data.info.sala, sendToClient);

        obj.response = {message:"Left sala!", left: 1};
        return obj;
    }

}


async function handleUpdatePlayersSala(sala_id, sendToClient){
    let players_info = await managerDB.getPlayersInfoFromSala(sala_id);

    players_info.forEach(async (player) => {
        let session = await managerDB.getSessionByUserId(player.id);
        sendToClient(session.uid, JSON.stringify({response: {action: 'update_players', players: players_info}} ));
    });

    return {players: players_info};
}

module.exports = {
    login,
    createSala,
    joinSala,
    leaveSala
};