const managerDB = require("../server/managerDB");

async function login(user, password){

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
        
        managerDB.insertUserToken(aux_user.id, token);
        return obj;
    }

    obj.status = 500;
    obj.response = "User not found!";
    return obj
}

async function checkToken(token){
    if(token != null){

        let session = await managerDB.getSessionByToken(token);
        console.log("session!:", session);

        if(session != null){
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
    
}






module.exports = {
    login,checkToken,createSala
};