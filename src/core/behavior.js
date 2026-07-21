import {
PetState
}
from "./state"



import {
petData
}
from "./petData"



export function randomBehavior(){


if(
petData.energy<20
){

return PetState.SLEEP

}



if(
petData.hunger<20
){

return PetState.IDLE

}



let r=Math.random()



if(r<0.6){

return PetState.IDLE

}



if(r<0.85){

return PetState.WALK

}



return PetState.SLEEP


}
