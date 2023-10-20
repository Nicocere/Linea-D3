import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FadeLoader } from "react-spinners";
import { addDoc, collection, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { baseDeDatos, storage } from '../../../firebaseConfig.mjs';
import { query, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';

function EditProds() {
    const { register, watch, handleSubmit, setValue, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const { productId } = useParams();
    const [imageFile, setImageFile] = useState(null);
    const productDocRef = doc(baseDeDatos, "productos", productId);
    const [isLoading, setIsLoading] = useState(false)
    
    const [productData, setProductData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        categoria: '',
        talle: '',
        stock: '',
        imagen: '',
    });

    const updateProduct = async (productId, updatedData, imageFile) => {
        try {
            // Si hay una nueva imagen para subir
            if (imageFile) {
                // Subir la imagen a Firebase Storage
                const storageRef = ref(storage, 'productos/' + imageFile.name);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                // Esta promesa se resolverá cuando la imagen esté completamente subida
                const uploadPromise = new Promise((resolve, reject) => {
                    uploadTask.on('state_changed',
                        (snapshot) => {
                            // Aquí puede agregar código para mostrar el progreso del upload si lo desea
                        },
                        (error) => {
                            console.error(error);
                            reject(error);
                        },
                        async () => {
                            // Una vez finalizado el upload, obtener la URL de la imagen
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        }
                    );
                });

                // Esperamos que la imagen se suba y obtenemos la URL de descarga
                const downloadURL = await uploadPromise;
                // Actualizar la información del producto con la nueva URL de la imagen
                updatedData.imagen = downloadURL;
            }

            // Ahora puedes actualizar la información en Firestore (con o sin imagen nueva)
            const productRef = doc(baseDeDatos, "productos", productId);
            await updateDoc(productRef, updatedData);

            Swal.fire({
                icon: 'success',
                title: 'Producto Editado',
                text: `Has editado correctamente un Producto `,
            }).then(() => {
                navigate('/admin/addProds');
            });
            
        } catch (e) {
            console.error("Error al actualizar el producto: ", e);
        }
    };




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
                setValue("categoria", product.categoria);
                setValue("talle", product.talle);
                setValue("stock", product.stock);

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
        const { nombreProd, precioProd, categoria, talle, stock, descrProd, imagenProd } = data;
        setIsLoading(true);

        const fieldsFilled = (                            
            watch('nombreProd') &&
            watch('precioProd') &&
            watch('descrProd') &&
            watch('imagenProd') &&
            watch('categoria') &&
            watch('stock') &&
            watch('talle')         
        );
        if (!fieldsFilled) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos y selecciona una localidad antes de confirmar.',
            });
            return;  // Salir de la función
        }
        const updatedData = {
            nombre: nombreProd,
            precio: precioProd,
            categoria: categoria,
            talle: talle,
            stock: stock,
            descripcion: descrProd,
            imagen: productData.imagen, // Mantén la URL de la imagen original
        };
        try {
            // Actualiza el producto en Firestore
            await updateProduct(productId, updatedData, imageFile);
            setIsLoading(false);

        } catch (e) {
            console.error("Error al actualizar el producto: ", e);
            setIsLoading(false);

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

                    <label> Categoria </label>
                    <input
                        {...register("categoria", { required: true })}
                        value={productData.categoria}
                        name="categoria"

                        onChange={e => setProductData({ ...productData, categoria: e.target.value })}
                        placeholder="Categoria del producto"
                    />
                    {errors.categoria && <p className='message-error' > la categoria del producto es requerida</p>}


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


                    <label> Stock </label>
                    <input
                        {...register("stock", { required: true })}
                        value={productData.stock}
                        name="stock"
                        type='number'
                        onChange={e => setProductData({ ...productData, stock: e.target.value })}
                        placeholder="Stock del producto"
                    />
                    {errors.stock && <p className='message-error' > Agregue un Stock al producto</p>}


                    <label> Talle del producto </label>
                    <input
                        {...register("talle", { required: true })}
                        value={productData.talle}
                        name="talle"
                        onChange={e => setProductData({ ...productData, talle: e.target.value })}
                        placeholder="Talle del producto"
                    />
                    {errors.talle && <p className='message-error' > Agregue un talle al producto</p>}

                    {
                        productData.imagen &&
                        <>
                            <span>Imagen actual:</span>
                            <img src={productData.imagen} alt="Imagen actual del producto" width="100" />
                        </>
                    }

                    <label> Nueva Imagen: </label>
                    <input
                        {...register("imagenProd")}
                        type="file"
                        onChange={handleFileChange}
                    />

                    {isLoading ? (
                        <div className="spinner">
                            Actualizando...
                            <FadeLoader color="black" />
                        </div>
                    ) :  <button className='add-prod-btn' type="submit">Editar Producto</button>
                         
                    }
                </form>
            </div>
        </div>
    );
}

export default EditProds;
