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


const message = ref("")


const showInfo = ref(false)


let clickTimer = null



// 点击噜噜

function touch(){


if(clickTimer){

clearTimeout(clickTimer)

clickTimer=null

return

}



clickTimer=setTimeout(()=>{


cssState.value="happy"



petData.mood +=5


petData.touchCount +=1


petData.exp +=1


petData.coin +=1



if(petData.mood>100){

petData.mood=100

}



message.value="嘿嘿，被摸到了~"



savePet()



setTimeout(()=>{


if(cssState.value==="happy"){

cssState.value=""

}


message.value=""


},2000)



clickTimer=null



},250)



}





// 双击查看状态

function showStatus(){


showInfo.value=!showInfo.value


}




// 自动行为

function autoAction(){



// 防止打断点击开心

if(cssState.value==="happy"){

return

}



const action=randomBehavior()



if(action===PetState.SLEEP){


cssState.value="sleep"


message.value="噜噜睡觉啦 Zzz"


}



else if(action===PetState.WALK){


cssState.value="walk"


message.value="噜噜散步中"


}



else if(action===PetState.HAPPY){


cssState.value="happy"


message.value="噜噜很开心"


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


🪙 金币：

{{petData.coin}}



</div>





<div
class="lulu"
:class="cssState"
>


<img

:src="image"

@click="touch"

@dblclick="showStatus"

/>


</div>



</div>



</template>





<style>


.box{

position:relative;

width:260px;

height:300px;


}



/*
  拖动区域
*/

.lulu{


width:220px;


height:220px;


-webkit-app-region:drag;


animation:float 3s infinite;


}





img{


width:100%;


height:100%;


object-fit:contain;


cursor:pointer;


user-select:none;


-webkit-user-drag:none;



/*
 图片禁止拖动
 保证点击有效
*/

-webkit-app-region:no-drag;


}




/*
 气泡
*/

.bubble{


position:absolute;


top:5px;


left:20px;


background:white;


padding:8px 12px;


border-radius:15px;


font-size:14px;


z-index:20;



-webkit-app-region:no-drag;


}




/*
 属性面板
*/

.status{


position:absolute;


top:30px;


left:180px;


width:120px;


background:white;


padding:10px;


border-radius:10px;


font-size:13px;


line-height:22px;


z-index:30;



-webkit-app-region:no-drag;


box-shadow:0 2px 8px rgba(0,0,0,0.15);


}




/*
 普通漂浮
*/


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




/*
 开心
*/

.lulu.happy{


animation:

happy 0.5s infinite;


}




@keyframes happy{


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




/*
 睡觉
*/

.lulu.sleep{


opacity:0.5;


animation:none;


}




/*
 散步
*/

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
