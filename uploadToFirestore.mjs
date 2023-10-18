
import { collection, addDoc } from 'firebase/firestore';
import { baseDeDatos } from './src/firebaseConfig.mjs';


const subirProductosAFirebase = () => {
  const productos = [
          {
            "id": 1,
            "nombre": "Pantalón Basquet ",
            "tipo": "pantalon",
            "precio": 39.99,
            "descripcion": "Pantalón.",
            "talla": ["S", "M", "L", "XL"],
            "Sexo": "Varon",
            "imagen": "../assets/Imagenes/Productos/273514902_148137677596453_5790797265671867786_n.jpg"
          },
          {
            "id": 2,
            "nombre": "Musculosa Imperio Juniors ",
            "tipo": "musculosa",
            "precio": 19.99,
            "descripcion": "Musculosa deportiva para entrenamientos intensos. 100 % sublimado full color, Incluye nombres, números, logos, escudos, publicidades, etc NO USAMOS VINILO, te ayudamos a diseñar tu logo",
            "talla": ["S", "M", "L"],
            "Sexo": "Varon",
            "imagen": "../assets/Imagenes/Productos/273514902_148137677596453_5790797265671867786_n.jpg"
          },
          {
            "id": 3,
            "nombre": "Conjunto Baquet",
            "tipo": "conjunto",
            "precio": 59.99,
            "descripcion": "Conjunto deportivo que incluye Camiseta Local, alternativa y un short 100 % sublimado full color, Incluye nombres, números, logos, escudos, publicidades, etc NO USAMOS VINILO, te ayudamos a diseñar tu logo",
            "talla": ["S", "M", "L"],
            "Sexo": "Varon",
            "imagen": "../assets/Imagenes/Productos/273514902_148137677596453_5790797265671867786_n.jpg"
          },
          {
            "id": 4,
            "nombre": "Musculosa Baquet Femenino",
            "tipo": "musculosa",
            "precio": 59.99,
            "descripcion": "Incluye Camiseta Local o alternativa 100 % sublimado full color, Incluye nombres, números, logos, escudos, publicidades, etc NO USAMOS VINILO, te ayudamos a diseñar tu logo",
            "talla": ["S", "M", "L"],
            "Sexo": "Mujer",
            "imagen": "../assets/Imagenes/Productos/237253725_849070612671153_4928767245816774925_n.jpg"
          },          {
            "id": 5,
            "nombre": "Short Baquet Femenino",
            "tipo": "short",
            "precio": 59.99,
            "descripcion": "Incluye un short 100 % sublimado full color, Incluye nombres, números, logos, escudos, publicidades, etc NO USAMOS VINILO, te ayudamos a diseñar tu logo",
            "talla": ["S", "M", "L"],
            "Sexo": "Mujer",
            "imagen": "../assets/Imagenes/Productos/237742860_374149944080541_719373799119731363_n.jpg"
          },          {
            "id": 6,
            "nombre": "Conjunto Baquet Femenino",
            "tipo": "conjunto",
            "precio": 59.99,
            "descripcion": "Conjunto deportivo que incluye Camiseta Local, alternativa y un short 100 % sublimado full color, Incluye nombres, números, logos, escudos, publicidades, etc NO USAMOS VINILO, te ayudamos a diseñar tu logo",
            "talla": ["S", "M", "L"],
            "Sexo": "Mujer",
            "imagen": "../assets/Imagenes/Productos/238937083_890229625223346_8588427839051680528_n.jpg"
          },
      
  ];

// // Llama a la función para subir los productos a Firebase

const ref = collection(baseDeDatos, 'productos');
productos.map((producto) => addDoc(ref, producto));

};

subirProductosAFirebase();