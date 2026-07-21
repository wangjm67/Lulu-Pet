const {
contextBridge
}=require("electron")


contextBridge.exposeInMainWorld(

"Lulu",{

version:"1.0"

}

)
