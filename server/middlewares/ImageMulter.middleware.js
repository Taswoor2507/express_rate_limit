// 1024 bites = 1KB
// 1024 KB = 1MB
// 1024 MB = 1GB
// req.user=  user
//req.file = file{buffer}
// strorage disk , ram
// limit
// fileFilter
import multer from  "multer";
// ["image/png" , "image/jpeg"]  ==  pdf
const imageMulter = function(maxSize , allowedTypes){
    const storage = multer.memoryStorage();
    const limits  = {maxSize: maxSize *1024 * 1024 }  
    const fileFilter =  function(req,file,cb){
        if(allowedTypes.includes(file.mimetype)){
          return  cb(null , true); 
        }
        cb(new Error("File type not allowed") , false);
    }

    return multer({storage , limits , fileFilter});
}
export {imageMulter};
