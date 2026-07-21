import {
petData
}
from "./petData"



export function updatePet(){


const now=Date.now()



const minutes=

(now-petData.lastUpdate)
/60000



if(minutes>0){


petData.hunger -= minutes*0.5


petData.energy -= minutes*0.3



if(petData.hunger<0)

petData.hunger=0



if(petData.energy<0)

petData.energy=0



if(petData.hunger<30){

petData.mood-=1

}



if(petData.mood<0)

petData.mood=0


}



petData.lastUpdate=now


}
