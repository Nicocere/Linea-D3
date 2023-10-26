import Header from './componentes/Header/Header';
import Main from './componentes/Main/Main';
import Footer from './componentes/Footer/Footer';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';


//<<<<---------- Reimportar todos los adicionales ------------->>>>

// import { collection, addDoc } from 'firebase/firestore';
// import { baseDeDatos } from './FireBaseConfig';
// import { Adicionales } from '../src/componentes/Adicionales/Adicionales.js' 
//  const ref = collection(baseDeDatos, 'adicionales');
//  Adicionales.map((adicional) => addDoc(ref, adicional ));


//<<<<---------- Reimportar todos los productos ------------->>>>

// import { collection, addDoc } from 'firebase/firestore';
// import { baseDeDatos } from './FireBaseConfig';
// import { stockProductos } from '../src/componentes/Products/Products' 
//  const ref = collection(baseDeDatos, 'productos');
// stockProductos.map((producto) => addDoc(ref, producto));


function App() {

  const animations = [
    'slideOut',
    // 'pulseAndFade', 
    // 'zoomIn',
    // 'zoomOut', 
    // 'fadeAndDrop'
  ];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
    
    const [isLoadingProds, setIsLoadingProds] = useState(true);

    const [loadingClass, setLoadingClass] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setLoadingClass(randomAnimation);
            setTimeout(() => {
                const loadingScreen = document.getElementById("loadingScreen");
                loadingScreen.style.display = "none";
            }, 1000);
        }, 2000);
    }, [randomAnimation]);

  return (
    <BrowserRouter>

<div id="loadingScreen" className={loadingClass} >
    <div class="logo-container">
    <img className={isLoadingProds ? 'logo-preloader pulse' : 'logo-preloader'} 

             src={'../assets/logo/LineaD3Logo.png'} alt="logo envio flores" />
        <div class="spinner"></div>
       
    </div>
</div>
    <div className='cuerpo'>
        <Header />
        <Main />
        <Footer />
    </div>
    
    </BrowserRouter>
  );
}

export default App;
