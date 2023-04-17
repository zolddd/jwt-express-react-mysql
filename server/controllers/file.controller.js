import multer from "multer";
import { pool } from "../config";

const imgconfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("FILE: "+file.originalname);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const isImage = (req,file,callback)=>{
  if(file.mimetype.startsWith("image")){
      callback(null,true)
  }else{
      callback(null,Error("only image is allowd"))
  }
}

export let upload = multer({
  storage:imgconfig,
  fileFilter:isImage
}).single("image")


//export const upload = multer({ storage: storage }).single("myfile");


export const create = async (req,res) => {
  //console.log(req.file.originalname);
  try {
    const {filename} = req.file;
    const {name,price}=req.body;
    console.log("imprimiendo name body: "+name);
    console.log("imprimiendo filename: "+filename);
   
    const [result] = await pool.query(
      "INSERT INTO product (name,price,id_user,image) VALUES (?,?,?,?)",
      [name,price,1,filename]
    );
    res.json({message:"create product"});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:error.message})
  } 
};
