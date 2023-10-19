import React, { useEffect, useState } from 'react';
import { addDoc, collection, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { baseDeDatos, storage } from '../../../firebaseConfig.mjs';
import { query, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

function EditProds() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { productId } = useParams();
    const [imageFile, setImageFile] = useState(null);
    const productDocRef = doc(baseDeDatos, "productos", productId);

    const updateProduct = async (productId, updatedData) => {
        try {
            const productRef = doc(baseDeDatos, "productos", productId);
            await updateDoc(productRef, updatedData);
            console.log("Producto actualizado");
            Swal.fire({
                icon: 'success',
                title: 'Producto Editado',
                text: `Has editado correctamente un Producto `,
            });
        } catch (e) {
            console.error("Error al actualizar el producto: ", e);
        }
    };
    

    const [productData, setProductData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: '',
    });

    const fetchProduct = async () => {
        try {
            const productDoc = await getDoc(productDocRef);
            if (productDoc.exists()) {
                const product = productDoc.data();
                setProductData(product);
                // Llena los campos del formulario con los datos del producto
                setValue("nombreProd", product.nombre);
                setValue("precioProd", product.precio);
                setValue("descrProd", product.descripcion);
                // No necesitas llenar el campo de imagen ya que no se puede prellenar por razones de seguridad.
            } else {
                console.error("El producto no existe");
            }
        } catch (error) {
            console.error("Error al obtener el producto:", error);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const onSubmit = async (data) => {
        const { nombreProd, precioProd, descrProd, imagenProd } = data;

        const fieldsFilled = nombreProd && precioProd && descrProd;
        if (!fieldsFilled) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos antes de confirmar.',
            });
            return;
        }

        const updatedData = {
            nombre: nombreProd,
            precio: precioProd,
            descripcion: descrProd,
            imagen: productData.imagen, // Mantén la URL de la imagen original
        };

        try {
            // Actualiza el producto en Firestore
            await updateProduct(productId, updatedData);
        } catch (e) {
            console.error("Error al actualizar el producto: ", e);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <div className='div-add-edit-prods'>
            <div className='div-addProd'>
                <h3>Editar Producto</h3>
                <form className='form-addProd' onSubmit={handleSubmit(onSubmit)}>
                    <label> Nombre del producto </label>
                    <input
                        {...register("nombreProd", { required: true })}
                        placeholder="Nombre del producto"
                    />
                    {errors.nombreProd && <p className='message-error'> El nombre del producto es requerido</p>}

                    <label> Precio del producto </label>
                    <input
                        {...register("precioProd", { required: true })}
                        placeholder="Precio del producto"
                    />
                    {errors.precioProd && <p className='message-error'> El precio del producto es requerido</p>}

                    <label> Descripción del producto </label>
                    <textarea
                        {...register("descrProd", { required: true })}
                        placeholder="Descripción del producto"
                    />
                    {errors.descrProd && <p className='message-error'> Agregue una descripcion del producto</p>}

                    <label> Imagen </label>
                    <input
                        {...register("imagenProd")}
                        type="file"
                    />

                    <button className='add-prod-btn' type="submit">Editar Producto</button>
                </form>
            </div>
        </div>
    );
}

export default EditProds;
