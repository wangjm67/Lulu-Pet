import {
petData
}
from "./petData"



export function addExp(value){


petData.exp+=value



let need=
petData.level*20



if(petData.exp>=need){


petData.level++


petData.exp=0


petData.mood=100


return true


}



return false


}
