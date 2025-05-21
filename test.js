
function generateRandomDice(troops, type){

    let max = 0;
    if(type == "attacker"){
        max = troops <= 3 && troops > 0 ? troops : 1;
    }else if(type == "defender"){
        max = troops <= 2 && troops > 0 ? troops : 1;
    }

    let nums = [];
    for(let i = 0; i < max; i++){
        let randomInt = Math.floor(Math.random() * 6) + 1;
        nums.push(randomInt);
    }
    
 
    return nums;
}


function main(){


    let attacker_dice = generateRandomDice(2, 'attacker');
    let defender_dice = generateRandomDice(1, 'defender');

    console.log("attacker_dice", attacker_dice);
    console.log("defender_dice", defender_dice);


    //TO DO logica de los dados

    

}



main();