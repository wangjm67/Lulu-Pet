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



const image=ref(luluImage)


const cssState=ref("")


const message=ref("")



function touch(){


cssState.value="happy"


petData.mood += 5

petData.touchCount += 1

petData.exp += 1

petData.coin += 1


if(petData.mood>100)

petData.mood=100



message.value="嘿嘿，被摸到了"



savePet()



setTimeout(()=>{


cssState.value=""


message.value=""


},2000)


}




function autoAction(){


const action=randomBehavior()



if(action===PetState.SLEEP){


cssState.value="sleep"

message.value="噜噜睡觉啦~"


}


else if(action===PetState.WALK){


cssState.value="walk"


message.value="噜噜散步中"


}


else{


cssState.value=""


message.value=""


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


<div class="box">


<div
v-if="message"
class="bubble"
>

{{message}}

</div>


<div
class="lulu"
:class="cssState"
>


<img
@click="touch"
:src="image"
/>


</div>


</div>


</template>


<style>


.box{


width:260px;

height:300px;


-webkit-app-region:drag;


}



.lulu{


width:220px;

height:220px;


}



img{


width:100%;

height:100%;


object-fit:contain;


-webkit-app-region:no-drag;


cursor:pointer;


}



.bubble{


position:absolute;


background:white;


padding:8px 12px;


border-radius:15px;


top:10px;


left:20px;


font-size:14px;


-webkit-app-region:no-drag;


}



.lulu{


animation:float 3s infinite;

}



@keyframes float{


50%{

transform:translateY(-8px);

}


}



.lulu.happy{


animation:

happy 0.5s infinite;


}



@keyframes happy{


50%{

transform:
rotate(8deg)
scale(1.1);

}


}



.lulu.sleep{


opacity:.5;


animation:none;


}



.lulu.walk{


animation:

walk 1s infinite alternate;


}



@keyframes walk{


from{

transform:translateX(-20px);

}


to{

transform:translateX(20px);

}


}



</style>
