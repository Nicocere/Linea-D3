import mongoose from "mongoose";
import { generateToken } from "../../../utils.js";


export const loginSessionMiddleware = async (req, res) => {

    let User
    if (req.user) {
  
      req.user.last_connection = Date.now()
      if (req.user.isAdmin) {
        //Si ya existe otra cookie que no sea del ADMIN
        if (req.cookies.User || req.cookies.Premium) {
          res.clearCookie('Premium');
          res.clearCookie('User');
        }
          // Si el usuario es un admin, generar y asignar el token 'Admin'
        const tokenIsAdmin = generateToken('Admin');
        res.cookie('Admin', tokenIsAdmin, { maxAge: 3600000, httpOnly: true });
        
        req.user.cookie = tokenIsAdmin
        await req.user.save()
  
        return res.status(200).redirect('https://envioflores-backend.vercel.app/users/admin');
      } 
  
      if (req.user.isPremium) {
        //Si ya existe otra cookie que no sea del PREMIUM
        if (req.cookies.User || req.cookies.Admin) {
          res.clearCookie('Admin');
          res.clearCookie('User');
        }
  
        const tokenIsPremium = generateToken('Premium');
        res.cookie('Premium', tokenIsPremium, { maxAge: 3600000, httpOnly: true });
  
        req.user.cookie = tokenIsPremium
        await req.user.save()
  
        return res.redirect('/users/Premium');
      } 
      if (req.user.role === 'user') {
        //Si ya existe otra cookie que no sea del USER
        if (req.cookies.Admin || req.cookies.Premium) {
          res.clearCookie('Admin');
          res.clearCookie('Premium');
        }
  
          // Si el usuario no es un admin, generar y asignar el token 'User'
          User = mongoose.Types.ObjectId().toString()
          res.cookie('User', User, { maxAge: 3600000, httpOnly: true });
  
          req.user.cookie = User
          await req.user.save()
  
          return res.json({User});
      }
  
    }
  }