import fs from 'fs';
import path from 'path';


function read(fileName){
  let data = fs.readFileSync(path.join(process.cwd(),"src", "database", fileName + ".json"), 'utf-8');
  return JSON.parse(data) || []
}


function write(fileName, info){
  fs.writeFileSync(path.join(process.cwd(),"src", "database", fileName + ".json"), JSON.stringify(info, null, 4));
  return true
}

function deleteFile(fileName, file){
  return fs.unlinkSync(path.join(process.cwd(),"src", "uploads", file, fileName));
}



export {read, write, deleteFile}