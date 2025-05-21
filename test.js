
function generateRandomDice(troops, type){


    let max = 0;
    
    if(type == "defender"){
        if(troops >= 2){
            max = 2;
        }else{
            max = 1;
        }
    }else if(type=="attacker"){
        if(troops >= 3){
            max = 3;
        }else if(troops > 1){
            max = 2;
        }else{
            max = 1;
        }
    }

    let nums = [];
    for(let i = 0; i < max; i++){
        let randomInt = Math.floor(Math.random() * 6) + 1;
        nums.push(randomInt);
    }

    nums = nums.sort((a,b) => b - a);
    
    return nums;
}


function main(){
    let attack_troops = 1
    let defender_troops = 4

    let attacker_dice = generateRandomDice(attack_troops, 'attacker');
    let defender_dice = generateRandomDice(defender_troops, 'defender');

    console.log("attacker_dice", attacker_dice);
    console.log("defender_dice", defender_dice);

    //TO DO logica de los dados
    let aux = defender_dice.length > attacker_dice.length ? attacker_dice.length : defender_dice.length;

    for(let i = 0; i < aux; i++){

        if(attacker_dice[i] > defender_dice[i]){
            defender_troops--;
        }else{
            attack_troops--;
        }

    }

    console.log("attack_troops", attack_troops);
    console.log("defender_troops", defender_troops);
}



main();