// import NavBar from "../Nav/NavBar";
import React, { useState, useEffect } from 'react'
import NavBarTop from "../NavBarTop/NavBarTop";
import NavbarMobile from '../NavbarMobile/NavbarMobile';


const Header = () => {

    const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

    // Función que actualiza el estado con el ancho de la ventana
    const actualizarAnchoVentana = () => {
        setAnchoVentana(window.innerWidth);
    };

    // Agregar un evento de cambio de tamaño de la ventana para actualizar el ancho
    useEffect(() => {
        window.addEventListener('resize', actualizarAnchoVentana);

        // Limpia el evento cuando el componente se desmonta
        return () => {
            window.removeEventListener('resize', actualizarAnchoVentana);
        };
    }, []);



    return (
        <>
            <header className="div-header-dinamic">
                {anchoVentana < 768 ?
                    <NavbarMobile />
                    :
                    <NavBarTop />
                }
                {/* <NavBar/> */}
            </header>
        </>
    );
};

export default Header;