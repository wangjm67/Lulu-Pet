import {
petData
}
from "./petData"



export function updatePet(){


const now=Date.now()



if(!petData.lastUpdate){

petData.lastUpdate=now

return

}



const minutes =

(now-petData.lastUpdate)
/60000




// 饥饿下降

petData.hunger -= minutes * 2



// 精力下降

petData.energy -= minutes * 1.5




// 限制范围

if(petData.hunger < 0){

petData.hunger=0

}



if(petData.energy < 0){

petData.energy=0

}





// 饥饿影响心情

if(petData.hunger < 30){


petData.mood -= minutes * 2


}




// 精力太低也影响心情

if(petData.energy < 20){


petData.mood -= minutes * 1


}





if(petData.mood < 0){

petData.mood=0

}



if(petData.mood>100){

petData.mood=100

}





petData.lastUpdate=now


}
