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



import {
addExp
}
from "../core/grow"



import {
feed
}
from "../core/food"





const image=ref(luluImage)



const cssState=ref("")



const message=ref("")



const showInfo=ref(false)



const eyeX=ref(0)



const eyeY=ref(0)



let clickTimer=null





// 点击互动

function touch(){



if(clickTimer){


clearTimeout(clickTimer)

clickTimer=null


return

}



clickTimer=setTimeout(()=>{



cssState.value="happy"



petData.mood+=5


petData.touchCount++



const levelUp=
addExp(1)



petData.coin++



if(petData.mood>100)

petData.mood=100





if(levelUp){


message.value="噜噜升级啦！"


}else{


message.value="嘿嘿，被摸到了~"


}





savePet()



setTimeout(()=>{


cssState.value=""


message.value=""


},2000)




clickTimer=null



},250)



}





// 查看状态

function showStatus(){


showInfo.value=!showInfo.value


}






// 喂食

function giveFood(){



const result=feed()



if(result){


message.value="谢谢投喂~"


}else{


message.value="金币不够啦"


}



savePet()



}





// 鼠标跟随

function mouseMove(e){



const rect=e.currentTarget.getBoundingClientRect()



const x=
e.clientX-rect.left



const y=
e.clientY-rect.top




eyeX.value=
(x-110)/15



eyeY.value=
(y-110)/15



}





// 自动行为

function autoAction(){



if(cssState.value==="happy")

return





const action=randomBehavior()



if(action===PetState.SLEEP){


cssState.value="sleep"

message.value="噜噜睡觉啦 Zzz"


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


<div
class="box"
@mousemove="mouseMove"
>



<div
v-if="message"
class="bubble"
>

{{message}}

</div>





<div
v-if="showInfo"
class="status"
>


🐶 {{petData.name}}

<br>


❤️ 心情：

{{Math.floor(petData.mood)}}


<br>


🍖 饥饿：

{{Math.floor(petData.hunger)}}


<br>


⚡ 精力：

{{Math.floor(petData.energy)}}


<br>


⭐ 等级：

{{petData.level}}


<br>


✨经验：

{{petData.exp}}


<br>


🪙金币：

{{petData.coin}}



<br><br>



<button
@click="giveFood"
>

🍖 喂噜噜

</button>


</div>







<div
class="lulu"
:class="cssState"
>




<img

:src="image"

@click="touch"

@dblclick="showStatus"

:style="{

transform:

`translate(${eyeX}px,${eyeY}px)`

}"

>


</div>




</div>


</template>







<style>


.box{


position:relative;


width:260px;


height:300px;


}




.lulu{


width:220px;


height:220px;


animation:float 3s infinite;


}





img{


width:100%;


height:100%;


object-fit:contain;


cursor:pointer;


user-select:none;


-webkit-user-drag:none;


}






.bubble{


position:absolute;


top:10px;


left:20px;


background:white;


padding:8px 12px;


border-radius:15px;


z-index:10;


}




.status{


position:absolute;


top:20px;


left:10px;


background:white;


padding:10px;


border-radius:10px;


z-index:20;


line-height:22px;


}



button{


cursor:pointer;


}






@keyframes float{


50%{


transform:translateY(-8px);


}



}





.lulu.happy{


animation:

happy .5s infinite;


}




@keyframes happy{


50%{


transform:rotate(8deg) scale(1.1);


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
