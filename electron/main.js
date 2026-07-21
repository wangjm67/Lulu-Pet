const {
app,
BrowserWindow,
screen,
Tray,
Menu
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
)


}


})



win.loadFile(

path.join(
__dirname,
"../dist/index.html"
)

)



}




function createTray(){


tray=new Tray(

path.join(
__dirname,
"../src/assets/lulu.png"
)

)



const menu =
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



tray.setContextMenu(menu)



}




app.whenReady()
.then(()=>{


createWindow()


createTray()


})
