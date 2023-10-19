
import { collection, addDoc } from "firebase/firestore";
import { baseDeDatos } from "../../../firebaseConfig.mjs";


export const guardarUsuarioEnFirestore = async (usuario) => {
    try {
        const docRef = await addDoc(collection(baseDeDatos, "usuarios"), usuario);
        console.log("Usuario registrado con ID: ", docRef.id);
    } catch (e) {
        console.error("Error al agregar el usuario: ", e);
    }
};
