import React from 'react'
import ItemListContainer from "../ItemListContainer/ItemListContainer"
import CarouselComponent from "../Carousel/Carousel";
import HomeCategories from "../HomeCategories/HomeCategories";
import HomeBanner from '../HomeBanner/HomeBanner';


const Home = () => {


    return (
        <>
        <HomeBanner/>
            <HomeCategories />
            <CarouselComponent />
            <ItemListContainer />
        </>
    );
};

export default Home;