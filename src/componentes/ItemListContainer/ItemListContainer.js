import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ItemList from "../itemList/ItemList";
import { FadeLoader } from "react-spinners";

import { SearchContext } from "../../context/SearchContext";
import Searcher from "../Searcher/Searcher";
import axios from "axios";
import Pagination from "../Pagination/Pagination";


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
                let result;
                if (categoryName) {
                    // Si existe una categoría seleccionada, realizamos la petición a /post/pagination
                    // result = await axios.get(`http://localhost:8080/productos/post/pagination`, {
                    result = await axios.get(`https://envioflores-backend.vercel.app/productos/post/pagination`, {
                        params: {
                            categoria: categoryName,
                            page: page
                        }
                    });
                } else {
                    // Si no hay categoría seleccionada, realizamos la petición a /productos
                    // result = await axios.get('http://localhost:8080/productos');
                    result = await axios.get(`https://envioflores-backend.vercel.app/productos`);
                }
                setPaginationInfo(result.data.info);

                const productos = result.data.prods.map((prod) => {
                    return { ...prod }
                });

                if (productos) {
                    setIsLoading(false)
                }
                setItems(productos)
            } catch (error) {
                console.log("No se pudo obtener la base de datos:", error)
            }
        }
        fetchData()
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