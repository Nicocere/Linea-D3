import React, { useEffect, useState } from 'react';
import { addDoc, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { baseDeDatos, storage } from '../../../firebaseConfig.mjs';
import { query, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import CarouselComponent from '../../../componentes/Carousel/Carousel';
import { Avatar, Button, SwipeableDrawer, Typography, useMediaQuery ,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';

function AddBanners() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [banners, setBanners] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    
    const [showAddNewBanner, setShowAddNewProd] = useState(false)
    const [showEditPrincipalText, setShowEditPrincipalText] = useState(false)


    const handleShowAddNewProd = () => {
        setShowAddNewProd(!showAddNewBanner)
    }

    const handleNavigateToEdit = (productId) => {
        navigate(`/admin/edit/banners/${productId}`);
        
    }

    const [bannerData, setBannerData] = useState({
        nombre: '',
        imagen:'',
    });
    
    const fetchProducts = async () => {
        const productsCollection = query(collection(baseDeDatos, "banners"));
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setBanners(productList);
    };
    
    useEffect(() => {
        console.log("ESTO PASA")
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
            watch('imagenProd') 
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
                const storageRef = ref(storage, 'banners/' + imageFile.name);
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
                        const bannerDataWithImage = {
                            ...bannerData,
                            imagen: downloadURL,
                            status: true,
                        };

                        // Ahora puedes agregar el producto a Firestore
                        const docRef = await addDoc(collection(baseDeDatos, "banners"), bannerDataWithImage);
                        console.log("Producto agregado con foto y con ID: ", docRef.id);

                        Swal.fire({
                            icon: 'success',
                            title: 'Producto Agregado',
                            text: `Has agregado correctamente un nuevo Producto`,
                        });

                        fetchProducts()
                        
                        // Luego de agregar el producto puedes limpiar el estado
                        setBannerData({
                            nombre: '',
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
            <h2 className='banner-title'>Banners</h2>
            <div className='perfil-usuario-btns'>
                <button onClick={() => navigate(-1)}>Volver atrás</button>
                <button >Administrar Usuarios</button>
                <button >Cambiar / Crear Promociones</button>
                <button >Editar Perfil</button>
            </div>
            
            <div className='div-addProd' >
                <h3>Agregar Nuevos Banners</h3>

                <Button variant={showAddNewBanner ? 'outlined' : 'contained'} style={{ color: 'gold', backgroundColor: showAddNewBanner ? '' : 'black', borderColor: 'gold', marginBottom: '10px' }} onClick={handleShowAddNewProd}>
                    {showAddNewBanner ? 'NO Agregar Nuevo Banner ' : 'Agregar Banner Nuevo'}</Button>

{
    showAddNewBanner &&
                <form className='form-addProd' onSubmit={handleSubmit(onSubmit)}>
                    <label> Nombre del Banner </label>
                    <input
                        {...register("nombreProd", { required: true })}
                        value={bannerData.nombre}
                        name="nombreProd"
                        
                        onChange={e => setBannerData({ ...bannerData, nombre: e.target.value })}
                        placeholder="Nombre del producto"
                        />
                    {errors.nombreProd && <p className='message-error' > El nombre del producto es requerido</p>}


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
                                Agregando Nuevo Banner, aguarde....
                                <FadeLoader color="black" />
                            </div>
                        ) : <button className='add-prod-btn black-btn' type="submit">Agregar Banner</button>
                    }
                </form>
        }
            </div>

                <div>
                    <h1>Banner Actual:</h1>
                    <CarouselComponent />

                </div>

            <div>
                <h3>Editar / Eliminar Banners</h3>
                <table className="products-table">
                    <thead className="thead-table">
                        <tr>
                            <th>Nombre</th>
                        
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((product, index) => (
                            <tr key={index}>
                                <td className="td-tbody">{product.nombre}</td>
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


export default AddBanners