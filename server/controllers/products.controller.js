import { pool } from "../config";
import multer from "multer";

export const getProducts = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM product");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductsByIdUser = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM product WHERE id_user = ?",
      [req.params.id]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage });
  upload.single("myfile");

  return res.json("archvio enviado");

  /* 
  try {

    const storage=multer.diskStorage({
      destination:function(req,file,cb){
         cb(null,"uploads")
      },
      filename:function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`)
     }
    })
    const upload=multer({storage:storage})
    
    upload.single("myfile")

    const { name, price,id_user } = req.body;
    const [result] = await pool.query(
      "INSERT INTO product (name,price,id_user) VALUES (?,?,?)",
      [name,price,id_user]
    );
    res.json({message:"create product"});
  } catch (error) {
    return res.status(500).json({message:error.message})
  } */
};

export const updateProduct = async (req, res) => {
  try {
    const [result] = await pool.query("UPDATE product SET ? WHERE id=?", [
      req.body,
      req.params.id,
    ]);

    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM product WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "product not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
