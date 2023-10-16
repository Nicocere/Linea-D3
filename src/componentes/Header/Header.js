import NavBar from "../Nav/NavBar";
import NavBarTop from "../NavBarTop/NavBarTop";

const Header = () => {


    return (
        <>
        <header className="div-header-dinamic">

                    <NavBarTop/>
                    <NavBar/>
        </header>
    </>
    );
};

export default Header;