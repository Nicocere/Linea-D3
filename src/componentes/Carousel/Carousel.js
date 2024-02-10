import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';

import Carousel from 'react-bootstrap/Carousel';

import './carousel.css'

import { baseDeDatos } from '../../firebaseConfig.mjs';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa los módulos necesarios de Firebase
import { storage } from '../../firebaseConfig.mjs';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { FadeLoader } from 'react-spinners';
import { Typography } from '@mui/material';

//Assets
// import HawksImage from '../../assets/t-shirts/hawks.png'
// import blackDesign from '../../assets/t-shirts/blackDesign.png'
// import imperioShirt from '../../assets/t-shirts/imperioShirt.png'
// import LineaLogo from '../../assets/banner/LineaLogo.png'
// import LineaLogoOrange from '../../assets/banner/LineaLogoOrange.png'


const CarouselComponent = () => {


    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            let imageUrls = [];
            const storageRef = ref(storage, 'banners'); // 'banners' es el nombre de la carpeta en Firebase Storage
            const banners = await listAll(storageRef);
            for (let i = 0; i < banners.items.length; i++) {
                const banner = banners.items[i];
                const url = await getDownloadURL(banner);
                imageUrls.push(url);
            }
            setImages(imageUrls);
        }
        fetchImages();
    }, []);

    return (
        <div className="carousel-container">
            {
                !images ? (<div>
                    <Typography variant='h5' color='black' sx={{marginTop:'30px'}} >Cargando, aguarde....</Typography>
                    <FadeLoader className="fadeLoader" color="black" />
                </div>)
                        :
                    <Carousel interval={3000} pause={false} data-bs-theme='light'>
                        {images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img className="d-block w-100" src={image} alt={`Carousel ${index}`} />
                                {/* <Carousel.Caption>
                            <h3>{index + 1}</h3>
                        </Carousel.Caption> */}
                            </Carousel.Item>
                        ))}
                    </Carousel>
            }
        </div>
    );
}

export default CarouselComponent
