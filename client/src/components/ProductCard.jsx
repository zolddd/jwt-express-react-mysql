import { getProduts } from "../api/product.api";
import { useEffect, useState } from "react";
import v from "../../../uploads/1681603700018-vvvv.png";
import style from "../styles/cardProduct.css"
export default function ProductCard() {
  const [products, setproducts] = useState([]);


  useEffect(() => {
    async function loadTasks() {
      const response = await getProduts();
      console.log(response.data);
      setproducts(response.data);
    }
    loadTasks();
  }, []);


  const renderMain=()=>{
    if(products.length===0) return <h1>No products find</h1>;

    return products.map((el) => (
      <div class="wrap">
  <div class="box">
    <div class="box-top">
      <img class="box-image" src="https://images.unsplash.com/photo-1622219809260-ce065fc5277f?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMwNjYxOQ&ixlib=rb-1.2.1&q=85" alt="Girl Eating Pizza"/>
      <div class="title-flex">
        <h3 class="box-title">Kelsie Meyer</h3>
        <p class="user-follow-info">17 Projects</p>
      </div>
      <p class="description">Whipped steamed roast cream beans macchiato skinny grinder café. Iced grinder go mocha steamed grounds cultivar panna aroma.</p>
    </div>
    <a href="#" class="button">Follow Kelsie</a>
  </div>
  
</div>
    ))
  }
  return (
    <>
    {
      renderMain()
    }
     
    </>

  );
}
