import {
petData
}
from "./petData"



const KEY="LULU_SAVE"



export function savePet(){


localStorage.setItem(

KEY,

JSON.stringify(petData)

)


}



export function loadPet(){


const data=

localStorage.getItem(KEY)



if(data){


Object.assign(

petData,

JSON.parse(data)

)


}



return petData

}
