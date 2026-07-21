<script setup>

import {
ref,
onMounted
} from "vue"


import luluImage from "../assets/lulu.png"


import {
PetState
}
from "../core/state"


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


import {
petData
}
from "../core/petData"



const image = ref(luluImage)


const cssState = ref("")



function touch(){


cssState.value="happy"


petData.mood += 5


if(petData.mood>100){

petData.mood=100

}


savePet()



setTimeout(()=>{


cssState.value=""


},1000)


}




function autoAction(){


const action=randomBehavior()


if(action===PetState.SLEEP){

cssState.value="sleep"

}

else{

cssState.value=""

}


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
:class="cssState"
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

transform:translateY(0);

}


50%{

transform:translateY(-8px);

}


100%{

transform:translateY(0);

}


}



.happy{


animation:

happyMove 0.5s infinite;


}



@keyframes happyMove{


0%{

transform:rotate(0deg) scale(1);

}


50%{

transform:rotate(8deg) scale(1.1);

}


100%{

transform:rotate(-8deg) scale(1);

}


}



.sleep{


opacity:0.5;


transform:scale(0.8);


}


</style>
