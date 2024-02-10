import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import ItemList from "../itemList/ItemList";
import { FadeLoader } from "react-spinners";
import { SearchContext } from "../../context/SearchContext";
import Searcher from "../Searcher/Searcher";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { baseDeDatos } from "../../firebaseConfig";
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa los módulos necesarios de Firebase
import Categorization from "../Categories/Categorizacion";
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Typography, useMediaQuery } from "@mui/material";
import './itemListContainer.css'



const ItemListContainer = () => {
  const isSmallScreen = useMediaQuery('(max-width:850px)');

  const { prodEncontrado } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { categoryName, searchParam } = useParams()
  const [sortOrder, setSortOrder] = useState(''); // Valor predeterminado.
  const [totalProcessedItems, setTotalProcessedItems] = useState(0);
  const [processedItems, setProcessedItems] = useState([]); // Estado para almacenar productos procesados

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

  // useEffect para procesar los productos cuando se cambie el sortOrder o los productos filtrados
  useEffect(() => {
    let processedItemsCopy = [...items]; // Copia los productos filtrados para procesarlos
    switch (sortOrder) {
      case 'recientes':
        processedItemsCopy.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return b.createdAt - a.createdAt;
          }
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return 0;
        });
        break;
      case 'barato':
        processedItemsCopy.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
        break;
      case 'caro':
        processedItemsCopy.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
        break;

      case 'vendidos':
        processedItemsCopy.sort((a, b) => b.vendidos - a.vendidos);
        break;
      case 'alfabeto1':
        processedItemsCopy.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'alfabeto2':
        processedItemsCopy.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }
    setProcessedItems(processedItemsCopy); // Actualiza el estado con los productos procesados
  }, [sortOrder, items]); // Depende del sortOrder y de los productos filtrados



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

  return (
    <div className="productos">
      <Categorization />
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

          {
            isSmallScreen ?

              <Accordion sx={{ marginTop: '25px', }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography sx={{ fontWeight: '700' }}>Ordenar Productos</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ background: 'linear-gradient(rgb(215 215 215), rgb(255 255 255 / 0%))', padding: '8px 1px 16px' }}>
                  <div className="div-filtros">

                    <label>
                      <Checkbox
                        color="primary"
                        type="checkbox"
                        value="recientes"
                        checked={sortOrder === "recientes"}
                        onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                      /> Recién añadidos
                    </label>

                    <div>
                      <label>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          value="barato"
                          checked={sortOrder === "barato"}
                          onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                        /> Menor precio
                      </label>
                      <label>
                        <Checkbox
                          color="primary"
                          type="checkbox"
                          value="caro"
                          checked={sortOrder === "caro"}
                          onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                        /> Mayor precio
                      </label>

                    </div>

                    <label>
                      <Checkbox
                        color="primary"
                        type="checkbox"
                        value="vendidos"
                        checked={sortOrder === "vendidos"}
                        onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                      /> Más vendidos
                    </label>

                    <div>

                      <label>
                        <Checkbox className=""
                          color="primary"
                          type="checkbox"
                          value="alfabeto1"
                          checked={sortOrder === "alfabeto1"}
                          onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                        /> Ordenar de A / Z
                      </label>

                      <label>
                        <Checkbox className=""
                          color="primary"
                          type="checkbox"
                          value="alfabeto2"
                          checked={sortOrder === "alfabeto2"}
                          onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                        /> Ordenar de Z / A
                      </label>
                    </div>
                  </div>
                </AccordionDetails>
              </Accordion>
              :

              <div className="div-filtros">

                <label>
                  <input className=""
                    type="checkbox"
                    value="recientes"
                    checked={sortOrder === "recientes"}
                    onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                  /> Recién añadidos
                </label>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      value="barato"
                      checked={sortOrder === "barato"}
                      onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                    /> Menor precio
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="caro"
                      checked={sortOrder === "caro"}
                      onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                    /> Mayor precio
                  </label>

                </div>

                <label>
                  <input
                    type="checkbox"
                    value="vendidos"
                    checked={sortOrder === "vendidos"}
                    onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                  /> Más vendidos
                </label>

                <div>

                  <label>
                    <input className=""
                      type="checkbox"
                      value="alfabeto1"
                      checked={sortOrder === "alfabeto1"}
                      onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                    /> Ordenar de A / Z
                  </label>

                  <label>
                    <input className=""
                      type="checkbox"
                      value="alfabeto2"
                      checked={sortOrder === "alfabeto2"}
                      onChange={e => setSortOrder(prevOrder => prevOrder === e.target.value ? 'sin_ordenacion' : e.target.value)}
                    /> Ordenar de Z / A
                  </label>
                </div>
              </div>

          }
          <ItemList items={processedItems} prodEncontrado={prodEncontrado} />
        </>
      )}
    </div>
  );

};

export default ItemListContainer;