import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './carousel.css'
//Assets
import HawksImage from '../../assets/t-shirts/hawks.png'
import blackDesign from '../../assets/t-shirts/blackDesign.png'
import imperioShirt from '../../assets/t-shirts/imperioShirt.png'
import LineaLogo from '../../assets/banner/LineaLogo.png'
import LineaLogoOrange from '../../assets/banner/LineaLogoOrange.png'


const CarouselComponent = () => {

    return (
        <div className="carousel-container" >
            <Carousel autoPlay={2000} infiniteLoop={true} >
                <div>
                    <img src={blackDesign} />
                    {/* <p className="legend">Legend 2</p> */}
                </div>
                <div>
                    <img src={imperioShirt} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
                <div>
                    <img src={LineaLogo} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
                <div>
                    <img src={LineaLogoOrange} />
                    {/* <p className="legend">Legend 3</p> */}
                </div>
            </Carousel>
        </div>
    )
}

export default CarouselComponent