import {
petData
}
from "./petData"



const KEY="LULU_SAVE"




export function savePet(){


try{


localStorage.setItem(

KEY,

JSON.stringify(petData)

)


}


catch(e){


console.log(
"保存失败",
e
)


}



}





export function loadPet(){


try{


const data =

localStorage.getItem(KEY)



if(data){


Object.assign(

petData,

JSON.parse(data)

)


}



// ===== 兼容旧存档 =====


if(petData.name===undefined){

petData.name="噜噜"

}



if(petData.level===undefined){

petData.level=1

}



if(petData.exp===undefined){

petData.exp=0

}



if(petData.mood===undefined){

petData.mood=100

}



if(petData.hunger===undefined){

petData.hunger=100

}



if(petData.energy===undefined){

petData.energy=100

}



if(petData.touchCount===undefined){

petData.touchCount=0

}



if(petData.coin===undefined){

petData.coin=20

}



if(petData.foodCount===undefined){

petData.foodCount=0

}



if(petData.lastUpdate===undefined){

petData.lastUpdate=Date.now()

}



}


catch(e){


console.log(
"读取失败",
e
)


}



return petData



}
