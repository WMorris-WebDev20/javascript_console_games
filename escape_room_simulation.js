const readlineSync = require('readline-sync');

console.log("\nWelcome to the Escape Room Simulation!\n")

// User Inputs
const userName = readlineSync.question("What is your name? ");

// variables
let isPlaying = true;
let hasDied= false;
let hasKey = false;
    
console.log("\nOk "+`${userName}`+"!!!"+"\nYou are stuck in this room. You need to hurry and find the key to escape from this room!\nHere are your three choices:\n");

//Game while loop
while(isPlaying == true){
      
    let gameOptions = choices();
    
    if(gameOptions == 1){
        console.log("Oh no!! You stuck your hand in the wall and now you died!!!");
        hasDied = true;
        isPlaying = false;        
    }
    else if (gameOptions == 2 && hasKey == false){
         console.log("As you are searching around the room, you located the key under the bookshelf. \nNow what do you want to do?");
         hasKey = true;
              }
    else if(gameOptions == 2 && hasKey == true){
                  console.log("You already have the key. Try to escape now!!")
              }
    else if (gameOptions == 3 && hasKey == false){
                console.log("You have not found the key yet. Lets keep searching!")
            
            }
    else if(gameOptions == 3 & hasKey == true) {
                console.log("Horray you unlocked the door and made it out of the room!")
                isPlaying = false;
                }

     } // end while loop

    //  Game end message

if (hasDied == true){
    console.log("\nBetter luck next time " + `${userName}`)
}else{
console.log("\nThank you for playing!"+ "\nGood luck in your next adventure "+ `${userName}`);
}

// Game Functions
function choices(){
        let mychoice = readlineSync.keyIn("Use the number key to answer: \n[1] Look for the key in the hole in the wall\n[2] Search around the room for a key to the door\n[3] Try to open the door\n" , {limit: '$<1-3>', limitMessage: 'You did not select 1-3'})
        return mychoice
}
