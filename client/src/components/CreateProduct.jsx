import { createProduct } from "../api/product.api";
import axios from "axios";
import { useContextUser } from "../context/UserContext";
import { useState } from "react";
export default function CreateProduct() {

  const {user}=useContextUser();
  console.log("imprimiendo id del user en createProduct"+user.id)
  const [file,setFile] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  //const { user } = useContextUser();
  //console.log("Imprimiendo user desde createProduct");
 // console.log(user);
  
  const setimgfile = (e)=>{
    console.log(e.target.files[0])
    setFile(e.target.files[0])
  }
  const handlerPrice=(e)=>{
    setPrice(e.target.value)
  }
  const handlerName=(e)=>{
    setName(e.target.value)
  }
 const handlerSubmit=async(e)=>{
  e.preventDefault();
  let formData = new FormData();
  formData.append("name",name)
  formData.append("price",price);
  formData.append("image",file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

   axios({
    method:"POST",
    url:"http://localhost:3000/bazar/products",
    data:formData,
    headers: { "Content-Type": "multipart/form-data" }
   }).then(function (response) {
    //handle success
    console.log(response);
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });

  //console.log("STATUS: " + res);

 }
  return (
    <>
      <form>
      <label>Name</label>
      <input type="text" name="name" onChange={handlerName}/>
      <label>Price</label>
      <input type="text" name="price" onChange={handlerPrice}/>
      <label>File</label>
      <input type="file" name="image" onChange={setimgfile}/>
      <button type="submit" onClick={handlerSubmit}>Save</button>
      </form>
   
    </>
  );
}
