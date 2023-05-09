import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Read = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8800/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8800/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = searchQuery
    ? products.filter((product) => {
        const name = product.name ? product.name.toLowerCase() : "";
        const description = product.description ? product.description.toLowerCase() : "";
        return (
          name.includes(searchQuery.toLowerCase()) ||
          description.includes(searchQuery.toLowerCase())
        );
      })
    : products;

  return (
    <>
      <h1>Products</h1>
      <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
      {filteredProducts.map((product) => (
        <div key={product._id}>
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <img src={product.image} alt={product.name} />
          <Link to={`/update/${product._id}`}>
            <button>Update</button>
          </Link>
          <button onClick={() => handleDelete(product._id)}>Delete</button>
        </div>
      ))}
    </>
  );
};

export default Read;
