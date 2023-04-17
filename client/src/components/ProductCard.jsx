import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getProduts } from "../api/product.api";
import { useEffect, useState } from "react";
import v from "../../../uploads/1681603700018-vvvv.png"


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

  const renderMain = () => {
    if (products.length === 0) return <h1>No products find</h1>;
    return products.map((el) => (
      <Card sx={{ maxWidth: 345 }}>
     {/*   {<CardMedia
          sx={{ height: 140 }}
          image={`../../../uploads/${el.image}`}
          title="green iguana"
      /> } */}


        <img src={`/../uploads/${el.image}`}/>;
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {el.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {el.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Add to Card</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    ));
  };

  return (
    <>
  
   {renderMain()}
    </>
          
  );
}
