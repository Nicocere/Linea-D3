import React, { useState } from 'react';
import CartWidget from '../CartWidget/CartWidget'
import { NavLink, useNavigate } from 'react-router-dom'
import Searcher from '../Searcher/Searcher';
import NavSeccions from '../NavSeccions/NavSeccions'
import { onAuthStateChanged } from "@firebase/auth";
import { auth, baseDeDatos } from "../../firebaseConfig.mjs";
import { useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import useLogout from '../Login/LogOut/LogOut';
import './NavbarMobile.css'
import menuMobile from '../../assets/menu-mobile-w.svg'
import { AppBar, Avatar, Button, IconButton, SwipeableDrawer, Toolbar, Typography, useMediaQuery, Paper } from '@mui/material';
import styled from '@emotion/styled';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SubMenuUsers } from '../SubMenuUsers/SubMenuUsers';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';

const NavbarMobile = () => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:850px)');
    const [currentUser, setCurrentUser] = useState(null);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [openProfileDrawer, setOpenProfileDrawer] = useState(false);


    const navigate = useNavigate()
    const storageProducts = JSON.parse(localStorage.getItem('productos'));

    //ABRIR MENU LATERAL
    const handleToggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };


    //ABRIR MENU LATERAL PRODUCTOS
    const [openProductsDrawer, setOpenProductsDrawer] = useState(false);

    const handleToggleProductsDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenProductsDrawer(open);
    };

    //ABRIR MENU LATERAL OCASIONES
    const [openOcassionsDrawer, setOpenOcassionsDrawer] = useState(false);

    const handleToggleOcassionsDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenOcassionsDrawer(open);
    };


    const closeProductsDrawer = () => {
        setOpenProductsDrawer(false);
    };

    //ABRIR SUBMENU DE USUARIOS
    const handleToggleProfileDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenProfileDrawer(open);
    };

    const closeProfileDrawer = () => {
        setOpenProfileDrawer(false);
    };
    //USUARIO CONECTADO
    const logout = useLogout()

    const handleProfileNavigation = () => {
        if (userData.rol === 'administrador') {
            navigate('/administrador');
        } else {
            navigate('/perfil');
        }
    };

    const handleToggleSubMenuDrawer = () => {
        setOpenProfileDrawer(!openProfileDrawer);
    };

    //NAVEGADOR PERSONALIZADO
    const CustomizedAppBar = styled(AppBar)(({ theme }) => ({

        fontSize: isSmallScreen ? '10px' : '15px',
        paddingLeft: isSmallScreen && 0,
        paddingRight: isSmallScreen && 0,
        backgroundColor: 'none',
        flexWrap: 'wrap',

        background: 'linear-gradient(to top, black, black)',
        flexDirection: 'row',
    }));

    const CustomizedToolbar = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        fontSize: isSmallScreen ? '10px' : '15px',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // Override the default MuiToolbar styles
        '&.MuiToolbar-root': {
            paddingLeft: 0,
            paddingRight: 0,
        },
    }));

    // Función para cerrar el cajón de perfiles
    const handleVolverAtras = () => {
        // Cierra el cajón de perfiles
        closeProfileDrawer();
        // Abre o cierra el cajón principal según el estado actual
        handleToggleDrawer(!openDrawer)();
    };



    useEffect(() => {
        // Establecer el observador en el estado de autenticación
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                const fetchData = async () => {
                    if (auth.currentUser) {
                        const uid = auth.currentUser.uid;
                        const userDocRef = doc(baseDeDatos, "users", uid);
                        const userDoc = await getDoc(userDocRef);
                        if (userDoc.exists()) {
                            setUserData(userDoc.data());
                        } else {
                            console.error("No se encontró el usuario en Firestore");
                        }
                    }
                };
                fetchData();
            } else {
                setCurrentUser(null);
            }
        });
        // Limpiar el observador cuando el componente se desmonte
        return () => unsubscribe();

    }, []);


    return (
        <div className="nav-mobile" >
            <>
                <CustomizedAppBar className="menu-container" position="fixed" >

                    <CustomizedToolbar >
                        {/* <div className="menu-container" onClick={handleToggleDrawer(!openDrawer)}>
                <img className="menu-icon" src={menuMobile}></img>
                <span>Menú</span>
            </div> */}
                        <div style={{
                            position: 'relative',
                            // top: '15px',
                            // left: '5px', // ajusta el valor según tu diseño
                            // height: '20px',
                            // zIndex: 2000,
                            color: 'white',
                            borderRadius: ' 50%',
                            fontSize: '24px',
                            padding: '15px',
                            cursor: 'pointer',
                            width: '20px',
                        }} >
                            <IconButton
                                onClick={handleToggleDrawer(!openDrawer)}
                                sx={{
                                    position: 'relative',
                                    color: 'white',
                                    zIndex: '2000',
                                    transition: 'background .11s ease',
                                    '&:hover': { backgroundColor: '#80808047' },
                                }}
                            >
                                <MenuTwoToneIcon style={{ fontSize: '24px', color: 'white' }} />

                            </IconButton>
                        </div>
                        <NavLink to="/">
                            <img className="logo" src={'../assets/logo/LineaD3Logo.png'} alt="logo lineaD3" />

                        </NavLink>

                        <NavLink to="/cart">
                            <CartWidget />
                        </NavLink>

                    </CustomizedToolbar>
                </CustomizedAppBar>
            </>


            {/* MENU GENERAL */}
            <SwipeableDrawer
                anchor="left"
                open={openDrawer}
                onClick={handleToggleDrawer(false)}
                onClose={handleToggleDrawer(false)}
                onOpen={handleToggleDrawer(true)}
                disableBackdropTransition={true}
                disableDiscovery={true}
            >
                <div
                    role="presentation"
                    onKeyDown={handleToggleDrawer(false)}
                    style={{
                        width: '310px',
                        background: 'linear-gradient(to right, #0f0f0f, black)',
                        height: '100vh',
                    }}
                >
                    {/* Contenido adicional o enlaces relacionados con WhatsApp */}
                    {openDrawer && (
                        <div style={{
                             display: 'flex', flexDirection: 'column',
                            height: '100vh', justifyContent: 'space-between', color: 'white'
                        }}>
                         <Paper sx={{
                            // background: 'linear-gradient(to right, rgb(15, 15, 15), black)',
                            marginBottom: '10px', backgroundImage: 'url("/assets/imagenes/Banner/aro-basket.jpg")', backgroundSize: 'cover',
                            WebkitBackgroundSize: 'cover',
                        }}>

                            <Typography variant="subtitle1" sx={{
                                fontSize: '1.25rem',
                                fontWeight: '600', background: '#ffffff85', paddingTop: '14px',
                                display: 'flex', alignItems: 'flex-end', margin: '85px 0 0', paddingLeft: '10px',
                                justifyContent: 'space-between', borderBottom: '2px solid gold', flex: '0'
                            }}>
                                Menú
                            </Typography>

                        </Paper>

                            <div className='div-prods-SeccionMobile' >
                                <NavLink className='seccionLi' to='/' > Inicio </NavLink>


                                <div className='div-seccionLi' onClick={handleToggleDrawer(!openDrawer)}   >
                                    <NavLink className='seccionLi' to="/productos" onClick={handleToggleProductsDrawer(true)}>
                                        Productos
                                    </NavLink>
                                </div>

                                <NavLink className='seccionLi' to="/categoria/Funcionalidades" >Promociones</NavLink>

                                <NavLink className='seccionLi' to="/presupuestos" >Presupuestos</NavLink>

                                <NavLink className='seccionLi' to="/categoria/Especiales" >Quienes somos</NavLink>
                            </div>

                            {/* SESION DE USUARIO */}
                            {currentUser && userData ? (
                                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '95px', justifyContent:'center' }}
                                    onClick={handleToggleSubMenuDrawer}>

                                    <Avatar sx={{
                                        bgcolor: 'gold', marginRight: '5px', width: '25px',
                                        height: '25px', fontSize: '.80rem', color: 'black'
                                    }}>
                                        {userData.username.charAt(0).toUpperCase()}
                                    </Avatar>

                                    <Typography variant="subtitle1" sx={{
                                        margin: 0,
                                        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                                        fontWeight: '700',
                                        fontSize: ' 0.875rem',
                                        lineHeight: '1.75',
                                        letterSpacing: ' 0.02857em',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        color: 'gold'
                                    }}>

                                        {userData.username}
                                    </Typography>

                                    {openProfileDrawer && <SubMenuUsers userData={userData} />}
                                </div>
                            ) : (
                                <div>
                                    <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                        <Typography variant='overline' sx={{ color: 'white', }}>
                                            Iniciar Sesión
                                        </Typography>
                                    </NavLink>
                                </div>
                            )}

                        </div>
                    )}


                </div>
            </SwipeableDrawer>


            {/* MENU LATERAL DE CATEGORIA PRODUCTOS */}
            <SwipeableDrawer
                anchor="left"
                open={openProductsDrawer}
                onClick={handleToggleProductsDrawer(false)}
                onClose={handleToggleProductsDrawer(false)}
                onOpen={handleToggleProductsDrawer(true)}
                disableBackdropTransition={true}
                disableDiscovery={true}
            >
                {/* Contenido del segundo slide (categorías) */}
                {openProductsDrawer && (
                <div style={{
                    width: '300px', display: 'flex', flexDirection: 'column',
                    background: 'linear-gradient(to right, rgb(15, 15, 15), black)',
                    height: '100vh', zIndex: '1000'
                }}>


                        <Paper sx={{
                            // background: 'linear-gradient(to right, rgb(15, 15, 15), black)',
                            marginBottom: '10px', backgroundImage: 'url("/assets/imagenes/Banner/balls-stars.png")', backgroundSize: 'cover',
                            WebkitBackgroundSize: 'cover',
                        }}>

                            <Typography variant="subtitle1" sx={{
                                fontSize: '1.25rem',
                                fontWeight: '600', background: '#ffffff85', paddingTop: '14px',
                                display: 'flex', alignItems: 'flex-end', margin: '85px 0 0', paddingLeft: '10px',
                                justifyContent: 'space-between', borderBottom: '2px solid gold', flex: '0'
                            }}>
                                Productos
                            </Typography>

                        </Paper>


                        <Button
                            variant='text'
                            size='small'
                            sx={{
                                color: 'darkred',
                                width: '50%',
                                margin: 0,
                                fontWeight: '600',
                                fontSize: '15px',
                                position: 'relative',

                            }}
                            onClick={handleVolverAtras} // Cambio aquí
                        >
                            Volver atrás
                        </Button>

                        <div className="div-prods-SeccionMobile">
                            <NavLink className='list-products' to="/productos/hombre">Hombre</NavLink>
                            <NavLink className='list-products' to="/productos/mujer" >Mujer</NavLink>
                            <NavLink className='list-products' to="/productos/grandiosos">Grandiosos Muchachos</NavLink>
                            <NavLink className='list-products' to="/productos/conjuntos">Conjuntos</NavLink>
                            <NavLink className='list-products' to="/productos/buzos">Buzos</NavLink>
                            <NavLink className='list-products' to="/productos/musculosas">Musculosas</NavLink>
                            <NavLink className='list-products' to="/productos/short">Short</NavLink>


                        </div>

                    </div>
                )
                }


            </SwipeableDrawer >

            {/* MENU LATERAL USUARIOS */}

            <SwipeableDrawer
                anchor="left"
                open={openProfileDrawer}
                onClick={handleToggleProfileDrawer(false)}
                onClose={handleToggleProfileDrawer(false)}
                onOpen={handleToggleProfileDrawer(true)}
                disableBackdropTransition={true}
                disableDiscovery={true}
            >
                {openProfileDrawer && (
                    <div style={{
                        width: '300px', display: 'flex', flexDirection: 'column',
                        background: 'linear-gradient(to right, rgb(15, 15, 15), black)',
                        height: '100vh', zIndex: '1000'
                    }}>


                        <Paper sx={{
                            background: 'linear-gradient(to right, rgb(15, 15, 15), black)',
                            marginBottom: '10px', backgroundImage: 'url("/assets/logo/LineaD3Logo.png")', backgroundSize: 'cover',
                            WebkitBackgroundSize: 'cover',
                        }}>


                            <Typography variant="subtitle1" sx={{
                                fontSize: '1.25rem',
                                fontWeight: '600', background: '#ffffff85', paddingTop: '14px',
                                display: 'flex', alignItems: 'flex-end', margin: '85px 0 0', paddingLeft: '10px',
                                justifyContent: 'space-between', borderBottom: '2px solid gold', flex: '0'
                            }}>
                                Menu de Usuario
                            </Typography>

                        </Paper>

                        <Button
                            variant='text'
                            size='small'
                            sx={{
                                color: 'darkred',
                                width: '50%',
                                margin: 0,
                                fontWeight: '600',
                                fontSize: '15px',
                                position: 'relative',

                            }}
                            onClick={handleVolverAtras} // Cambio aquí
                        >
                            Volver atrás
                        </Button>
                        <div className='div-users' style={{ marginTop: '100px', padding: '0 10px' }}>
                            <Button variant='contained' size='small' sx={{
                                color: 'black',
                                margin: '10px', padding: '12px 33px', background: 'gold', transition: 'background .55s ease-in-out',
                                '&:hover': { background: 'none', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 50%), 0px 2px 2px 0px rgb(0 0 0 / 56%), 0px 1px 5px 0px rgb(35 56 4)' }
                            }} startIcon={<AccountBoxIcon />} onClick={handleProfileNavigation}>Ir a mi perfil</Button>

                            <Button variant='contained' size='small' sx={{
                                color: 'black',
                                margin: '10px', padding: '12px 33px', background: 'gold', transition: 'background .55s ease-in-out',
                                '&:hover': { background: 'none', boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 50%), 0px 2px 2px 0px rgb(0 0 0 / 56%), 0px 1px 5px 0px rgb(35 56 4)' }
                            }} startIcon={<DisabledByDefaultIcon />} onClick={logout}>Cerrar Sesión</Button>
                        </div>
                    </div>
                )}
            </SwipeableDrawer>


        </div >
    )
}

export default NavbarMobile