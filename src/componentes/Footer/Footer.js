import estilos from './footer.module.css'

const Footer = () => {
return ( 

    <footer className={estilos.foot}>

    <div className={estilos.linkFot}>
        <h4> Sitio Web Oficial de Envio Flores </h4>
    <p className={estilos.textoWebAflorar}> Floreria en linea, venta de flores en Ramos / Floreros / Canastas /
     Desayunos y Meriendas / Chocolates / Peluches / Vinos / Bebidas y más</p>
    </div>

    <div className={estilos.mediosDePago}> 
       <div className="mediosDePago"> 
            <h3>Medios De Pago</h3>
            <p> Usted podra seleccional al finalizar la compra si comprar mediante Mercado Pago o Paypal 
                y luego usar la tarjeta de Credito / Debito que desee </p> 
            <img src= {'../assets/visa@2x.png'} className="tarjetaFoot"  alt=""/>
            <img src={"../assets/cabal@2x.png"}  className="tarjetaFoot" alt=""/>
            <img src={"../assets/mastercard@2x.png"}  className="tarjetaFoot" alt=""/>
            <img src={"../assets/mercadopago@2x.png"}  className="tarjetaFoot" alt=""/>
            <img src={"../assets/pagofacil@2x.png"}  className="tarjetaFoot" alt=""/>
            <img src={"../assets/paypal@2x.png"}  className="tarjetaFoot" alt=""/>
            <img src={"../assets/visa@2x.png"}   className="tarjetaFoot"alt=""/>
            <img src={"../assets/banelco@2x.png" }  className="tarjetaFoot"alt=""/>
        </div>
    </div>

    <div className={estilos.contacto}>
        <h3>Contactanos</h3>
        <a href="tel:+54 9 11 4788 9185" className={estilos.contactoTel}> +54 9 11 4788 9185</a>
        
        <a href="mailto:regalosflores25@gmail.com" className={estilos.contactoMail}> Regalosflores25@gmail.com </a>

    </div>
    
    <div className={estilos.socialBarFooter}> 
        <h3> Redes Sociales</h3>
        <a href="http://facebook.com/flores.aflorar" className={estilos.fbFoot}> Facebook</a>
        <a href="http://instagram.com/aflorar.arg" className={estilos.instFoot}>Instagram</a>
    </div>

    </footer>

 );
};

export default Footer;