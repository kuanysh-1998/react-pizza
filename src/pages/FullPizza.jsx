import axios from "axios";
import React from "react";
import { useParams, Link } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams;
  const [pizza, setPizza] = React.useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63f9de89473885d837d40609.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, []);
  return (
    <div className="container">
      <img src={pizza.imageUrl}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
