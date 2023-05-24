import jwt from "jsonwebtoken";
import SECRET from "../SECRET";
import { createNewUser,getUserByEmail,comparePassword } from "./user.controller";
import { sendMail } from "../config/emailer";
import { createRoles } from "./role.controller";
export const signUp=async(req,res)=>{
  //registra usuarios
    const {email,password}=req.body;
    let user={
      email:email
    }
    const idUser= await createNewUser(email,password);  
    let permissionsUser= createRoles(0,1,1,idUser)
    const token= jwt.sign({id:idUser},SECRET.SECRET,{
      expiresIn:86400 //24 hrs
    })
    sendMail(user)
    
  res.json({token});
}
export const signIn=async(req,res)=>{
  //login
  const {email,password}=req.body;
  const userFound=await getUserByEmail(email);
  console.log(userFound);

  if(!userFound){
    return res.status(400).json({message:"user not found"});
  }
  const matchpassword= await comparePassword(password,userFound.password);

  if(!matchpassword){
    //el !matchpassword es como si dijera matchpassword===false
    return res.status(401).json({toke:null,message:"invalid password"});
  }
  const token= jwt.sign({id:userFound.id},SECRET.SECRET,{
    expiresIn:86400 //24 hrs
  })

  res.json({token});
}