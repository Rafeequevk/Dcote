import fs from 'fs'

const deleteFile = (filepath)=>{
    fs.unlink(filepath,(err)=>{
if(err){
    throw(err)
}
    })
}
export default deleteFile