import fs from 'fs'
import path from 'path'


const deleteFile = (filepath)=>{
    const fullImagePath = `../public${filepath}`

    fs.unlink(fullImagePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${filepath}`, err);
        } else {
          console.log(`Successfully deleted file: ${filepath}`);
        }
      });
    };

export default deleteFile