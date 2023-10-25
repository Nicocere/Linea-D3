import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ItemList from "../itemList/ItemList";
import { FadeLoader } from "react-spinners";

import { SearchContext } from "../../context/SearchContext";
import Searcher from "../Searcher/Searcher";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

import { baseDeDatos } from "../../firebaseConfig";
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa los módulos necesarios de Firebase



const ItemListContainer = () => {

  const { prodEncontrado } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName, searchParam } = useParams()
  const storageProducts = JSON.parse(localStorage.getItem('productos'));
  // const [categoria, setCategoryName] = useState(null);

  async function fetchData() {
    try {
      const productosRef = collection(baseDeDatos, "productos");

      let queryRef = query(productosRef);

      const snapshot = await getDocs(queryRef);

      const productos = await snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(productos)
      if (categoryName) {

        const filterItems = productos.filter(prod => prod.categoria && prod.categoria.toLowerCase().includes(categoryName.toLowerCase()))

        setItems(filterItems)
      } else if (searchParam) {
        const searchProducts = productos.filter(prod => prod.categoria && prod.categoria.toLowerCase().includes(searchParam.toLowerCase()) || prod.nombre.toLowerCase().includes(searchParam.toLowerCase()))
        setItems(searchProducts)
      } else {
        setItems(productos);
        localStorage.setItem('productos', JSON.stringify(productos))
      }

      if (productos) {
        setIsLoading(false);
      }

    } catch (error) {
      console.log("No se pudieron obtener los productos:", error);
    }
  }

  useEffect(() => {
    if (storageProducts && !categoryName) {
      setItems(storageProducts)
      setIsLoading(false)
    } else if (storageProducts && categoryName) {

      const filterItems = storageProducts.filter(prod => prod.categoria && prod.categoria.toLowerCase().includes(categoryName.toLowerCase()))
      setItems(filterItems)
      setIsLoading(false)
    } else {
      fetchData();
    }
  }, [categoryName]);

  useEffect(() => {
    if (storageProducts && searchParam) {
      const searchProducts = storageProducts.filter(prod => prod.categoria && prod.categoria.toLowerCase().includes(searchParam.toLowerCase()) || prod.nombre.toLowerCase().includes(searchParam.toLowerCase()))
      setItems(searchProducts)
      setIsLoading(false)
    }
  }, [searchParam]);

  console.log(items)

  return (
    <div className="productos">

      {/* {
        categoryName ?
          <h3 className="cat-selected">Estás viendo la Categoría:
                    <strong className="cat-selected-strong" > {categoryName} </strong> </h3> : null
      } */}

      {isLoading ? (
        <>
          <h1 className="loadProd">Cargando Productos...</h1>
          <FadeLoader className="fadeLoader" color="rgb(255, 255, 255)" />
        </>
      ) : (
          <>
            {/* <Searcher items={items} /> */}
            {/* {categoryName ?
              <Pagination info={paginationInfo}
                setPage={setPage}
                category={categoryName}
              />
              : null} */}

            <ItemList items={items} prodEncontrado={prodEncontrado} />
          </>
        )}
    </div>
  );

};

export default ItemListContainer;