import {
petData
}
from "./petData"



export function updatePet(){


const now = Date.now()



if(!petData.lastUpdate){

petData.lastUpdate = now

return

}



const seconds =

(now - petData.lastUpdate) / 1000



// ===== 测试倍率 =====
// 正式发布时再调低


const speed = 1



// 饥饿下降

petData.hunger -= seconds * 0.8 * speed



// 精力下降

petData.energy -= seconds * 0.6 * speed




// 饥饿过低影响心情

if(petData.hunger < 30){


petData.mood -= seconds * 0.5


}



// 精力过低影响心情

if(petData.energy < 20){


petData.mood -= seconds * 0.8


}





// 数值限制


if(petData.hunger < 0){

petData.hunger = 0

}



if(petData.energy < 0){

petData.energy = 0

}



if(petData.mood < 0){

petData.mood = 0

}



if(petData.mood > 100){

petData.mood = 100

}



petData.lastUpdate = now



}
