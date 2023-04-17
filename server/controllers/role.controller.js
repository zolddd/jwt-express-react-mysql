import { pool } from "../config";

export const createRoles = async (x,r,w,id_user) => {
 
    try {
      const [result] = await pool.query(
        "INSERT INTO roles (x,r,w,id_user) VALUES (?,?,?,?)",
        [x,r,w,id_user]
      );
  
      return result[0];
      
    } catch (error) {
      console.log("*ERROR*",error);
    }
};

export const getRolesForIdUser = async (id_user) => {
  try {
    const [result]= await pool.query(
      "SELECT * FROM roles WHERE id_user = ?",[id_user]
    )
    if(result.length ===0){
      console.log("no existe ese user")
    }
    return result[0];
    
  } catch (error) {
    console.log(error)
  }
};

/* export const deleteRoles = async (req, res) => {
    try {
     const [result] = await pool.query(
       "DELETE FROM product WHERE id = ?",
       [req.params.id]
     )
   
     if(result.affectedRows===0){
       return res.status(404).json({message:"product not found"})
     }
     return res.sendStatus(204)
     
    } catch (error) {
     return res.status(500).json({message:error.message})
    }
     
}; */