import axios from "axios";
let header={

}
export const registerUser = async (user) =>{
  return await axios.post("http://localhost:3000/bazar/auth/signup",user);
}

export const loginUser = async (user) =>{
  return await axios.post("http://localhost:3000/bazar/auth/signin", user);
}

