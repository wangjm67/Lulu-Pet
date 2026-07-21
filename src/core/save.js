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


const data=

localStorage.getItem(KEY)



if(data){


Object.assign(

petData,

JSON.parse(data)

)


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
