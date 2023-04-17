import bcycript from "bcryptjs";
import { pool } from "../config";

export const getUsers = async (req, res) => {
   try {
     const [result] = await pool.query(
       "SELECT * FROM user"
     )
     res.json(result)
     
   } catch (error) {
     return res.status(500).json({message:error.message})    
   }
 
 };

 export const getUserById = async(id) => {
  try {
    const [result]= await pool.query(
      "SELECT * FROM user WHERE id = ?",[id]
    )
    if(result.length ===0){
      console.log("no existe ese user")
    }
    return result[0];
    
  }catch (error) {
    console.log("**Error** "+error)
  }
};


 
/**modificar el user controller 6/april/23 
 * para que no sean con metodos post delete solo el auth
*/
 export const getUserByEmail = async(email) => {
   
   try {
     const [result]= await pool.query(
       "SELECT * FROM user WHERE email= ?",[email]
     )
     if(result.length ===0){
      console.log("no existe ese user")
     }     
     console.log(result[0])
     return result[0];
   } catch (error) {
    console.log("*ERROR**"+error);
   }
 };

 export const createNewUser = async (email,password) => {
  try {
    let passwordEncript=await encryptPassword(password);
    const [result] = await pool.query(
      "INSERT INTO user (email,password) VALUES (?,?)",
      [email,passwordEncript]
    );
    //console.log("impriminedo result: " + result);
    //console.log(JSON.stringify(result.affectedRows))
    let data= JSON.stringify(result.insertId); //id
    console.log(data);
    return data;

  } catch (error) {
    console.log("*ERROR** "+error);
  }
 };


 export const createUser = async (req, res) => {
  
   try {
     let { email,password } = req.body;
 
     let passwordEncript=await encryptPassword(password);
     console.log("password encriptaded")
     console.log(passwordEncript);

     const [result] = await pool.query(
       "INSERT INTO user (email,password) VALUES (?,?)",
       [email,passwordEncript]
     );
 
     res.json({message:"created user satisfactori.. "});
     
   } catch (error) {
     return res.status(500).json({message:error.message})
   }
 };
 
 
 export const updateUser= async(req, res) => {
  try {
   const [result]= await pool.query("UPDATE user SET ? WHERE id=?",[req.body,req.params.id])

   res.json(result);
   
  } catch (error) {
   return res.status(500).json({message:error.message})
   
  }
 };
 
 
 export const deleteUser = async (req, res) => {
  try {
   const [result] = await pool.query(
     "DELETE FROM user WHERE id = ?",
     [req.params.id]
   )
 
   if(result.affectedRows===0){
     return res.status(404).json({message:"user not found"})
   }
   return res.sendStatus(204)
   
  } catch (error) {
   return res.status(500).json({message:error.message})
  }
   
 };

export const encryptPassword=async(password)=>{
   const salt= await bcycript.genSalt(10)
   return await bcycript.hash(password, salt)
}

export const comparePassword = async(password,receivedPassword)=>{

   return await bcycript.compare(password,receivedPassword)
};