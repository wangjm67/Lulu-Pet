import {
petData
}
from "./petData"



export function feed(){


if(petData.coin<5){


return false


}



petData.coin-=5


petData.hunger+=30


petData.mood+=10


petData.energy+=10



petData.foodCount++



if(petData.hunger>100)

petData.hunger=100


if(petData.mood>100)

petData.mood=100


if(petData.energy>100)

petData.energy=100



return true


}
