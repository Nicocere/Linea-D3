import './homeCategories.css'
import conjunto from '../../assets/conjuntoLinea.jpeg'
import equipo from '../../assets/equipoLinea.jpeg'
import camiseta from '../../assets/camisetaLinea.jpeg'
import { NavLink } from 'react-router-dom';


const HomeCategories = () => {


    return (
        <div className="home-categories-container" >
            <div className="banner" >
                <NavLink to="/productos/musculosas" >
                    <button>MUSCULOSAS</button>
                    <img src={camiseta} ></img>
                </NavLink>
            </div>
            <div className="banner" >
                <NavLink to="/productos/conjuntos" >
                    <button>CONJUNTOS</button>
                    <img src={conjunto} ></img>
                </NavLink>

            </div>
            <div className="banner" >
                <NavLink to="/productos/buzos" >
                    <button>EQUIPOS</button>
                    <img src={equipo} ></img>
                </NavLink>
            </div>
        </div>
    );
};

export default HomeCategories;