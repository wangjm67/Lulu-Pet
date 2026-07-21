import {
petData
}
from "../core/petData"
<script setup>

import {
ref,
onMounted
} from "vue"


import {
PetState
} from "../core/state"

import {
loadPet,
savePet
}
from "../core/save"


import {
updatePet
}
from "../core/update"


import {
randomBehavior
}
from "../core/behavior"

const state=ref(
PetState.IDLE
)



const mood=ref(100)



const image=ref(
"/src/assets/lulu/idle.png"
)



function touch(){


state.value=PetState.HAPPY



petData.mood+=5



if(petData.mood>100)

petData.mood=100



savePet()



setTimeout(()=>{


state.value=PetState.IDLE


},2000)

}


if(mood.value>100)

mood.value=100



setTimeout(()=>{


state.value=PetState.IDLE


},2000)

}



function autoAction(){

state.value=randomBehavior()

}



onMounted(()=>{


loadPet()



setInterval(()=>{


updatePet()


savePet()


autoAction()


},15000)


})


</script>



<template>


<div
class="lulu"
@click="touch"
>


<img
:src="image"
/>


</div>



</template>




<style>


.lulu{


width:220px;

height:220px;


-webkit-app-region:drag;


animation:
float 3s infinite;


}


img{


width:100%;

height:100%;


}



@keyframes float{


0%{

transform:translateY(0)

}


50%{

transform:translateY(-8px)

}


100%{

transform:translateY(0)

}


}


</style>
