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
  const { categoryName } = useParams("categoria")
  console.log(categoryName)
  const [page, setPage] = useState(1);
  const [paginationInfo, setPaginationInfo] = useState(null);
  // const [categoria, setCategoryName] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const productosRef = collection(baseDeDatos, "productos");

        let queryRef = query(productosRef);
        console.log(queryRef)
        console.log(productosRef)

        const snapshot = await getDocs(queryRef);

        const productos = await snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (categoryName) {
          // Si hay una categoría seleccionada, agrega una condición a la consulta
          // queryRef = query(productosRef.data(), where("categoria", "==", categoryName));
          console.log(productos)
          const filterItems = productos.filter(prod => prod.categoria && prod.categoria.toLowerCase().includes(categoryName.toLowerCase()))
          console.log(filterItems)
          setItems(filterItems)
        } else {

          setItems(productos);
        }
        console.log("prods filtra", productos)

        console.log("productos REF", productos)
        if (productos) {
          setIsLoading(false);
        }

      } catch (error) {
        console.log("No se pudieron obtener los productos:", error);
      }
    }
    fetchData();
  }, [categoryName, page]);


  return (
    <div className="productos">

      {
        categoryName ?
          <h3 className="cat-selected">Estás viendo la Categoría:
                    <strong className="cat-selected-strong" > {categoryName} </strong> </h3> : null
      }

      {isLoading ? (
        <>
          <h1 className="loadProd">Cargando Productos...</h1>
          <FadeLoader className="fadeLoader" color="rgb(255, 255, 255)" />
        </>
      ) : (
          <>
            {/* <Searcher items={items} /> */}
            {categoryName ?
              <Pagination info={paginationInfo}
                setPage={setPage}
                category={categoryName}
              />
              : null}

            <ItemList items={items} prodEncontrado={prodEncontrado} />
          </>
        )}
    </div>
  );

};

export default ItemListContainer;