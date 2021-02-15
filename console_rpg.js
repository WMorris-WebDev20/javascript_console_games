//Global variables
let isRacing = true;
let enemyHP = 100;
let inventoryItem = [];
let playerHp = 100;
let attackPower = "";
let enemyAlive = true;
let playerAlive = true;
let milesToRun = 50;
const enemies = [{name: "Wild Boar", inventoryIt: "Boar Tusk", ID: 1},
{name: "Mountain Lion", inventoryIt: "Fur Coat", ID: 2},{name: "Grizzly Bear", inventoryIt: "Bear Claw", ID: 3},{name: "Wild Mountain Man", inventoryIt: "Hatchet", ID: 4}];
const readlineSync = require('readline-sync');
const powerFactor = ["Max", "Min"];


//---Game simulation---
console.log("\nColossal Adventure")
console.log("*******************\n\n")
console.log("Hello and welcome to the 1985 annual 50 mile survival wilderness race. All contestants please head to the signup booth!\n")
const userName = readlineSync.question("Hey you!...What is your name?\n");
console.log(`\nHello ${userName} my name is Hank, and I will be your partner. I heard the officiators wispering that some of us might not make it, but don't worry ${userName} I am sure it will not be that bad!`);
console.log("\nContestants are you ready? 3..2..1..GO!!!");

// Game Loop
while(isRacing == true && milesToRun > 0 ){
       
    let walkNow = playerMovementChoices();
      
    if(walkNow == "w"){ 
        milesToRun -= 3;
        let enemyChance = randomNumGen(3);

        if( enemyChance == 1){
            enemyHP = 100;
            enemyAlive = true; 
            let myEnemy = getEnemy(enemies);
            let theEnemyName =  enemyTypeMessage(myEnemy)
            console.log(`Hey ${userName} look there is a ${theEnemyName}!` );
            let action = readlineSync.question("\nQuickly" + ` ${userName}`+ " what do you want to do? Run or Attack?\nUse the keyboard and type:\n[a] to attack\n[r] to run\n",{limit: ['r', 'a']});
            if (action == 'a'){                
                while(playerAlive == true && enemyAlive == true){
                    playerAttack(theEnemyName, myEnemy);
                    if (enemyAlive == true){
                        enemyAttack(theEnemyName);
                        if(playerAlive == true){
                            playerAttack(theEnemyName, myEnemy);
                        }
                    }
                }  
            }else if (action == "r"){
                milesToRun -= 5;
                console.log(`Time to run ${userName}, lets RUN!\n`);
                let escapeChance = randomNumGen(2);
                if(escapeChance == 1){
                    while(playerAlive == true && enemyAlive == true){
                        console.log(`Oh no ${userName} the ${theEnemyName} is attacking you\n`);
                        enemyAttack(theEnemyName);
                        if(playerAlive == true){
                        playerAttack(theEnemyName, myEnemy);
                        }
                    }
                } else console.log(`Good job ${userName} you escaped the ${theEnemyName}`);
            }
        }      
    }else if(walkNow == "print"){
        inventoryPrinting(inventoryItem);
        }
}//End of game loop

//End of Game messages
if (milesToRun <= 0){
    console.log(`Way to go ${userName} you have survived the wilderness survival race!`)
}else if(playerAlive == false){
    console.log(`${userName} you have Died! Better luck next time. Thank you for playing.`)
}
// *******Functions *********
function playerMovementChoices(){
    let raceMenue = readlineSync.question(`Come on ${userName} we need to get a move on it. You only have ${milesToRun} miles to go!\n\nUse the keyboard to answer:\n[w] to walk\n[print] to look at your inventory\n `)
    return raceMenue;
}
// Random Numbers
function randomNumGen(arr){
    return Math.floor((Math.random() * arr) + 1)
};
function randomPowerLevel(arr){
    let powerLevel = Math.floor(Math.random()*arr.length);
    return arr[powerLevel]
}
// Inventory functions
function putIntoInventory(enemy){
    myItem = enemy.map(eitem => eitem.inventoryIt)
    return inventoryItem.push({item : myItem });
}
function inventoryPrinting(inventory){
    const printInventory = inventory.map(printItem => `${printItem.item}`)
    const printedItems = printInventory.toString().replace(/,/g, ", ");

    return console.log(`\n*************************\nName: ${userName} HP: ${playerHp} Inventory Items: ${printedItems}\n*************************\n`);
}
//Enemy functions
function getEnemy(enemy){
    let theEnemyTypeID = randomNumGen(enemy.length);
    let theEnemy = whatEnemy(enemy,theEnemyTypeID);
    enemyHP = 100;
    return theEnemy;
}
function enemyTypeMessage(arr){
    let getName = arr.map(ename => ename.name );
    return getName;
}
function whatEnemy(enemy, id){
    let yourEnemy = enemy.filter( myEnemy => myEnemy.ID == id ? myEnemy : myEnemy[1])
    return yourEnemy;
};
//Attack functions
function enemyAttack(ename){
    let enemyPower = randomNumGen(100);
    playerHp -= enemyPower;
    milesToRun += 2;
    if(playerHp < 0){
        playerHp = 0;
    }
    console.log(`${userName} the ${ename} has taken ${enemyPower} HP`)
    if (playerHp <= 0){
        playerAlive = false;
        console.log(`${userName}..${userName}..wake up...oh NO. ${userName}......`)
        isRacing = false;
    }
}
function playerAttack(ename, enemy){
    attackPower = randomPowerLevel(powerFactor);
    if (attackPower == "Max" && enemyHP > 0){
        enemyHP -= 100
        milesToRun += 1;
        console.log(`You used MAX power!`)
        console.log("The fighting has pushed you back 1 mile.")
    } else if (attackPower == "Min" && enemyHP > 0){
        enemyHP -= 50
        console.log(`You used MIN power and the ${ename} has an HP: ${enemyHP} left\n`);
    }
    if (enemyHP <= 0){
        enemyAlive = false;
        let addedHP =randomNumGen(10)
        playerHp += addedHP;
        ((playerHp > 100)? playerHp = 100 : playerHp);
        console.log(`Way to go ${userName} you killed the ${ename} and gained HP: ${addedHP}\n`);
        putIntoInventory(enemy);
    }        
}



