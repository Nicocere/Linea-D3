import './homeCategories.css'
import conjunto from '../../assets/conjuntoLinea.jpeg'
import equipo from '../../assets/equipoLinea.jpeg'
import camiseta from '../../assets/camisetaLinea.jpeg'


const HomeCategories = () => {


    return (
        <div className="home-categories-container" >
            <div className="banner" >
                <button>CAMISETAS</button>
                <img src={camiseta} ></img>
            </div>
            <div className="banner" >
                <button>CONJUNTOS</button>
                <img src={conjunto} ></img>

            </div>
            <div className="banner" >
                <button>EQUIPOS</button>
                <img src={equipo} ></img>

            </div>
        </div>
    );
};

export default HomeCategories;