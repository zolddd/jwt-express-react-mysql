import axios from "axios";

export const getProduts = async () => {
  return await axios.get("http://localhost:3000/bazar/products");
};

export const createProduct = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };

  return await axios.post("http://localhost:3000/bazar/products",formData,config);
};

export const deleteProduct = async (user, token) => {
  return await axios.post("http://localhost:3000/bazar/auth/signin", user, {
    "X-Auth-Token": clientToken,
    "content-type": token,
  });
};
export const updateProduct = async (user, token) => {
  return await axios.post("http://localhost:3000/bazar/auth/signin", user, {
    "X-Auth-Token": clientToken,
    "content-type": token,
  });
};
