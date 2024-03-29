import React, { useEffect, useState } from 'react';
import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { baseDeDatos, storage } from '../../../firebaseConfig.mjs';
import { query, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

function AddProds() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [imageFile, setImageFile] = useState(null);


    const handleNavigateToEdit = (productId) => {
        navigate(`/admin/editProds/${productId}`);

    }

    const [productData, setProductData] = useState({
        nombre: '',
        precio: '',
        descripcion: '',
        imagen: '',
        stock: '',
        talle: '',
        categoria: '',
    });

    const fetchProducts = async () => {
        const productsCollection = query(collection(baseDeDatos, "productos"));
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(productList);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const onSubmit = async (e) => {

        setIsLoading(true)

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

        try {
            // Subir la imagen a Firebase Storage
            if (imageFile) {
                const storageRef = ref(storage, 'productos/' + imageFile.name);
                const uploadTask = uploadBytesResumable(storageRef, imageFile);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        // Progreso del upload
                    },
                    (error) => {
                        // Error en el upload
                        console.error(error);
                    },
                    async () => {
                        // Upload completado exitosamente, obtener la URL de descarga
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        // Guardar la URL de la imagen junto con otros datos del producto
                        const productDataWithImage = {
                            ...productData,
                            imagen: downloadURL
                        };

                        // Ahora puedes agregar el producto a Firestore
                        const docRef = await addDoc(collection(baseDeDatos, "productos"), productDataWithImage);
                        console.log("Producto agregado con foto y con ID: ", docRef.id);

                        Swal.fire({
                            icon: 'success',
                            title: 'Producto Agregado',
                            text: `Has agregado correctamente un nuevo Producto`,
                        });
                        fetchProducts()

                        // Luego de agregar el producto puedes limpiar el estado
                        setProductData({
                            nombre: '',
                            precio: '',
                            descripcion: '',
                            stock: '',
                            talle: '',
                            categoria: '',
                            imagen: '',
                        });
                    }
                );

            }
            setIsLoading(false)
        } catch (e) {
            setIsLoading(false)
            console.error("Error al añadir el producto: ", e);
        }
    };


    const deleteProduct = async (productId) => {
        try {

            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });
            // Si el usuario confirmó la eliminación
            if (result.isConfirmed) {
                // Aquí colocas tu código para eliminar el producto

                await deleteDoc(doc(baseDeDatos, "productos", productId));
                console.log("Producto eliminado");
                Swal.fire({
                    icon: 'success',
                    title: 'Producto Eliminado',
                    text: `Has eliminado un producto`,
                });
                fetchProducts()
            }

        } catch (e) {
            console.error("Error al eliminar el producto: ", e);
            Swal.fire(
                'Error',
                `Hubo un problema eliminando el producto. Error:${e}`,
                'error'
            );
        }
    }

    return (
        < div className='div-add-edit-prods'>

            <div className='perfil-usuario-btns'>
                <button onClick={() => navigate(-1)}>Volver atrás</button>
                <button >Administrar Usuarios</button>
                <button >Cambiar / Crear Promociones</button>
                <button >Editar Perfil</button>
            </div>
            
            <div className='div-addProd' >
                <h3>Agregar Nuevos Productos</h3>

                <form className='form-addProd' onSubmit={handleSubmit(onSubmit)}>
                    <label> Nombre del producto </label>
                    <input
                        {...register("nombreProd", { required: true })}
                        value={productData.nombre}
                        name="nombreProd"

                        onChange={e => setProductData({ ...productData, nombre: e.target.value })}
                        placeholder="Nombre del producto"
                    />
                    {errors.nombreProd && <p className='message-error' > El nombre del producto es requerido</p>}

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
                        value={productData.precio}
                        name="precioProd"

                        onChange={e => setProductData({ ...productData, precio: e.target.value })}
                        placeholder="Precio del producto"
                    />
                    {errors.precioProd && <p className='message-error' > El precio del producto es requerido</p>}

                    <label> Descripción del producto </label>
                    <textarea
                        {...register("descrProd", { required: true })}
                        value={productData.descripcion}
                        name="descrProd"
                        onChange={e => setProductData({ ...productData, descripcion: e.target.value })}
                        placeholder="Descripción del producto"
                    />
                    {errors.descrProd && <p className='message-error' > Agregue una descripcion del producto</p>}


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


                    <label> Imagen </label>
                    <input
                        {...register("imagenProd", { required: true })}
                        type="file"
                        name="imagenProd"
                        onChange={e => handleFileChange(e)}
                    />
                    {errors.imagenProd && <p className='message-error' > Debe agregar una Imagen</p>}


                    {
                        isLoading ? (
                            <div className="spinner">
                                Agregando Nuevo Producto, aguarde....
                                <FadeLoader color="black" />
                            </div>
                        ) : <button className='add-prod-btn black-btn' type="submit">Agregar Producto</button>
                    }
                </form>
            </div>


            <div>
                <h3>Editar / Eliminar Productos</h3>
                <table className="products-table">
                    <thead className="thead-table">
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="td-tbody">{product.nombre}</td>
                                <td className="td-tbody">{product.precio}</td>
                                <td className="td-tbody">{product.descripcion}</td>
                                <td className="td-tbody"><img src={product.imagen} alt={product.nombre} width="50" /></td>
                                <td className="td-tbody">
                                    <div className='btns-table'>
                                        <button className="btn-table-edit" onClick={() => handleNavigateToEdit(product.id)}>Editar</button>

                                        {/* <button className="btn-table-edit" onClick={() => updateProduct(product.id, product)}>Editar</button> */}
                                        <button className="btn-table-delete" onClick={() => deleteProduct(product.id)}>Eliminar</button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </ div>
    )

}


export default AddProds