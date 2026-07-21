const {
app,
BrowserWindow,
screen
}=require("electron")


const path=require("path")


let win



function createWindow(){


const display=
screen.getPrimaryDisplay()



win=new BrowserWindow({

width:260,

height:260,


x:
display.workArea.width-350,


y:
display.workArea.height-350,


transparent:true,

frame:false,


alwaysOnTop:true,


skipTaskbar:true,


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



app.whenReady()
.then(createWindow)
