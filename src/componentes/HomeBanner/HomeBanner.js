import React, { useState, useEffect, useRef } from 'react';
import { Typography, useMediaQuery } from '@mui/material';
import style from './homeBanner.module.css';
import { TypeAnimation } from 'react-type-animation';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Typed from 'typed.js';



const HomeBanner = () => {
    const [location, setLocation] = useState('Buenos Aires'); // Localidad predeterminada
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const isSmallScreen = useMediaQuery('(max-width:650px)');

    // const [directions, setDirections] = useState([]);

    // // Fetch direcciones
    // const fetchDirections = async () => {
    //     const directionsRef = collection(baseDeDatos, 'direcciones');
    //     const orderedQuery = query(directionsRef, orderBy('name')); // Ordena por el campo 'nombre'

    //     const directionsSnapshot = await getDocs(orderedQuery);
    //     const directionsData = [];
    //     directionsSnapshot.forEach((doc) => {
    //         directionsData.push({ id: doc.id, ...doc.data() });
    //     });
    //     setDirections(directionsData);
    // };

    // useEffect(() => {
    //     fetchDirections();
    // }, []);


    // Array de imágenes de fondo
    const backgroundImages = [
        '/assets/imagenes/Banner/aro-basket.jpg',
    ];

    // Función para obtener una imagen de fondo aleatoria
    const getRandomBackgroundImage = () => {
        const randomIndex = Math.floor(Math.random() * backgroundImages.length);
        return backgroundImages[randomIndex];
    };

    // Estado para la imagen de fondo
    const [backgroundImage, setBackgroundImage] = useState(getRandomBackgroundImage());

    useEffect(() => {
        // Cambiar la imagen de fondo cada vez que se renderice el componente
        setBackgroundImage(getRandomBackgroundImage());
    }, []); // Ejecutar solo una vez al montar el componente



    // Create reference to store the DOM element containing the animation
    const nameDirec = useRef(null);
    useEffect(() => {
        const prefixTexts = [
            "Envios a domicilio en Capital Federal",
            "Envios a domicilio en Buenos Aires",
            "Envios a domicilio a Todo el País",
            "Envios a domicilio en Cordoba",
            "Envios a domicilio en Santa Cruz",
            "Envios a domicilio en Formosa",
            "Envios a domicilio en Mendoza",
            "Envios a domicilio en Tucuman",

        ];

        const allTexts = [...prefixTexts,];

        const typed = new Typed(nameDirec.current, {
            strings: allTexts, // Aquí pasamos el array combinado de textos
            typeSpeed: 80,
            fadeOut: true,
            loop: true,
            showCursor: false,

            // Puedes agregar más opciones de configuración según lo necesites
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []); // Asegúrate de incluir nameDirecs en las dependencias del efecto


    return (
        <div className={style.homeBanner}>

        <div className={style.divHomeBanner} style={{
            backgroundImage: `url(assets/imagenes/Banner/aro-basket.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            WebkitBackgroundSize: 'cover', // Prefijo específico para Safari
        }}>

            <span ref={nameDirec}
                style={{
                    fontSize: isSmallScreen ? '2.3rem' : '3.3rem', fontWeight: '600',
                    display: 'inline-block', position: 'absolute',
                    top: '100px',
                    color: 'white', left: '0', padding: '0 20px', width: '100%',
                }}
                className={style.typography} />



            <div className={style.divTypography} style={{ padding: '0 20px', }}>
                <TypeAnimation

                    preRenderFirstString={true}

                    sequence={[

                        ` Nos especializamos en ser la empresa con la entrega más rapida del País, en menos de 25 dias REALES
                        realizaremos y enviaremos tu pedido. Somos la tienda N°1 en venta de ropa extra large` ,
                        1000,
                        
                    ]}
                    wrapper="span"
                    speed={50}
                    style={{
                        fontSize: isSmallScreen ? '1rem' : '1.2rem', display: 'inline-block', position: 'relative',
                        fontWeight: '800', color: 'black',
                        top: '0px',
                        padding: '25px', borderRadius: '4px',
                        background: '#ffffff85',
                    }}
                    className={style.typography}
                    repeat={Infinity}
                />

            </div>
        </div>
        </div>

    );
};

export default HomeBanner;
