<script setup>

import {
ref,
onMounted
} from "vue"


import {
PetState
} from "../core/state"



const state=ref(
PetState.IDLE
)



const mood=ref(100)



const image=ref(
"/src/assets/lulu/idle.png"
)



function touch(){


state.value=PetState.HAPPY


mood.value+=5


if(mood.value>100)

mood.value=100



setTimeout(()=>{


state.value=PetState.IDLE


},2000)

}



function autoAction(){


let r=Math.random()



if(r<0.7){

state.value=PetState.IDLE

}


else{

state.value=PetState.SLEEP

}


}



onMounted(()=>{


setInterval(()=>{


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
