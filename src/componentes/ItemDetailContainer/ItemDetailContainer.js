import React, { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
// import { getDoc, doc, collection } from 'firebase/firestore';
// import { baseDeDatos } from "../../FireBaseConfig";
import { useParams } from 'react-router-dom'
import { FadeLoader } from "react-spinners";
import axios from "axios";

const ItemDetailContainer = () => {

    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const { prodId } = useParams()

    useEffect(() => {

        async function fetchData() {
            try {
                // const result = await axios(`http://localhost:8080/productos/${prodId}`);
                const result = await axios.get(`https://envioflores-backend.vercel.app/productos/${prodId}`);

                if (result.data.prodID) {
                    setIsLoading(false)
                }
                setItem(result.data.prodID)
            } catch (error) {
                console.log("No se pudo obtener la base de datos:", error)
            }
        }
        fetchData()
    }, [prodId]);

    return (
        <div key={item._id} className="prodDetailContainer">
            {isLoading ? (
                <>
                    <h2 className="loadDetailProd">Cargando Productos....</h2>
                    <FadeLoader color="white" />
                </>
            ) : (
                <>
                    <ItemDetail item={item} />
                </>
            )}

        </div>
    );

}

export default ItemDetailContainer