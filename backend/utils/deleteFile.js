import fs from 'fs'
import path from 'path'


const deleteFile = (filepath)=>{
    

const abfilepath = path.join(path.resolve(),'public',filepath)

    fs.unlink(abfilepath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filepath}`, err);
        } else {
          console.log(`Successfully deleted file: ${filepath}`);
        }
      });
    };

export default deleteFile