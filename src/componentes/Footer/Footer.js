import estilos from './footer.module.css'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (

        <footer className={estilos.foot}>

            <div className={estilos.linkFot}>
                <h3> NAVEGACIÓN </h3>
                <ul className={estilos.navigation} >
                    <NavLink to="" >Inicio</NavLink>
                    <NavLink to="" >Productos</NavLink>
                    <NavLink to="" >Promociones</NavLink>
                    <NavLink to="" >Quiénes Somos</NavLink>
                </ul>
            </div>

            <div className={estilos.mediosDePago}>
                <div className="mediosDePago">
                    <h3>MEDIOS DE PAGO</h3>
                    <p> Usted podra seleccional al finalizar la compra si comprar mediante Mercado Pago o Paypal
                y luego usar la tarjeta de Credito / Debito que desee </p>
                    <img src={'../assets/visa@2x.png'} className="tarjetaFoot" alt="" />
                    <img src={"../assets/cabal@2x.png"} className="tarjetaFoot" alt="" />
                    <img src={"../assets/mastercard@2x.png"} className="tarjetaFoot" alt="" />
                    <img src={"../assets/mercadopago@2x.png"} className="tarjetaFoot" alt="" />
                    <img src={"../assets/pagofacil@2x.png"} className="tarjetaFoot" alt="" />
                    <img src={"../assets/paypal@2x.png"} className="tarjetaFoot" alt="" />
                    <img src={"../assets/visa@2x.png"} className="tarjetaFoot" alt="" />
                    <img src={"../assets/banelco@2x.png"} className="tarjetaFoot" alt="" />
                </div>
            </div>

            <div className={estilos.contacto}>
                <h3>CONTACTO</h3>
                <a href="tel:+54 9 11 0000 0000" className={estilos.contactoTel}> +54 9 11 0000 0000</a>

                <a href="mailto:lineaD3@gmail.com" className={estilos.contactoMail}> lineaD3@gmail.com </a>

            </div>

            <div className={estilos.socialBarFooter}>
                <h3> REDES</h3>
                <a href="http://facebook.com/flores.aflorar" className={estilos.fbFoot}> Facebook</a>
                <a href="http://instagram.com/aflorar.arg" className={estilos.instFoot}>Instagram</a>
            </div>

        </footer>

    );
};

export default Footer;