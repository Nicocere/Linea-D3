import ItemListContainer from "../ItemListContainer/ItemListContainer"
import CarouselComponent from "../Carousel/Carousel";
import HomeCategories from "../HomeCategories/HomeCategories";


const Home = () => {


    return (
        <>
            <CarouselComponent />
            <HomeCategories />
            <ItemListContainer />
        </>
    );
};

export default Home;