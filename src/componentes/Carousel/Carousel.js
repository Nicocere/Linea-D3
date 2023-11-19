import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './carousel.css'

import { baseDeDatos } from '../../firebaseConfig.mjs';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Importa los módulos necesarios de Firebase
import { storage } from '../../firebaseConfig.mjs';
import { getDownloadURL, listAll, ref } from "firebase/storage";

//Assets
import HawksImage from '../../assets/t-shirts/hawks.png'
import blackDesign from '../../assets/t-shirts/blackDesign.png'
import imperioShirt from '../../assets/t-shirts/imperioShirt.png'
import LineaLogo from '../../assets/banner/LineaLogo.png'
import LineaLogoOrange from '../../assets/banner/LineaLogoOrange.png'


const CarouselComponent = () => {


    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            let imageUrls = [];
            const storageRef = ref(storage, 'banners'); // 'banners' es el nombre de la carpeta en Firebase Storage
            const banners = await listAll(storageRef);
            console.log(", banners",banners)
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
        <div className="carousel-container" >
        <Carousel autoPlay={true} infiniteLoop={true} >
            {images.map((image, index) => (
                <div key={index}>
                    <img src={image} alt={`Carousel ${index}`} />
                    {/* <p className="legend">Legend {index + 1}</p> */}
                </div>
            ))}
        </Carousel>
    </div>
);
}

export default CarouselComponent