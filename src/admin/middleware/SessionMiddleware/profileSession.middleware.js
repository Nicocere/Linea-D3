

export const profileSessionMiddleware = async (req, res) => {
    //Compruebo si es tiene iniciada alguna sesion 
    if (!req.cookies.Premium && !req.cookies.User && !req.cookies.Admin) {
      res.redirect('/users/login')
    }
    //Compruebo si es Admin 
    if (req.cookies.Admin) {
      res.redirect('/users/admin')
    }
  
    //Compruebo si es Premium 
    if (req.cookies.Premium) {
      res.redirect('/users/Premium')
    }
  
    //Compruebo si es User 
    if (req.cookies.User) {
      res.redirect('/perfil')
    }
  };