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
    const { categoryName } = useParams()
    const [page, setPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState(null);
    // const [categoria, setCategoryName] = useState(null);


    useEffect(() => {
        async function fetchData() {
          try {
            const productosRef = collection(baseDeDatos, "productos");
    
            let queryRef = query(productosRef);
    
            if (categoryName) {
              // Si hay una categoría seleccionada, agrega una condición a la consulta
              queryRef = query(productosRef, where("tipo", "==", categoryName));
            }
            
            const snapshot = await getDocs(queryRef);
            
            const productos = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            
            console.log("productos REF", productos)
            if (productos) {
              setIsLoading(false);
            }
    
         setItems(productos);
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