const {
app,
BrowserWindow,
screen,
Tray,
Menu,
ipcMain
}=require("electron")


const path=require("path")


let win

let tray



function createWindow(){


const display =
screen.getPrimaryDisplay()



win=new BrowserWindow({


width:260,

height:300,


x:
display.workArea.width-350,


y:
display.workArea.height-400,



transparent:true,


frame:false,


alwaysOnTop:true,


skipTaskbar:true,


resizable:false,


webPreferences:{


preload:path.join(
__dirname,
"preload.js"
),


nodeIntegration:false,


contextIsolation:true


}


})



win.loadFile(

path.join(
__dirname,
"../dist/index.html"
)

)


}




// 接收拖动坐标

ipcMain.on(
"move-window",
(event,data)=>{


if(win){


const [x,y]=win.getPosition()



win.setPosition(

x+data.dx,

y+data.dy

)


}



}

)




function createTray(){


tray=new Tray(

path.join(
__dirname,
"lulu.png"
)

)



tray.setContextMenu(

Menu.buildFromTemplate([


{


label:"显示噜噜",

click(){

win.show()

}


},


{


label:"隐藏噜噜",

click(){

win.hide()

}


},


{


label:"退出噜噜",

click(){

app.quit()

}


}


])


)


}




app.whenReady()
.then(()=>{


createWindow()

createTray()


})
