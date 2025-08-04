const multer=require("multer");
const path=require("path");


const storagee=multer.diskStorage(
    {
    destination:"uploads",
    filename:(req,file,cb)=>{
        const exrct=path.extname(file.originalname);
        cb(null,Date.now()+exrct)
        
    }
    }
);

const upload=multer({storage:storagee});

module.exports=upload;