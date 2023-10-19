import CartManager from '../../dao/MongoManagers/CartManager.js'
const cartManager = new CartManager()

export const logOutSessionMiddleware = async (req, res) => {

    let user = res.locals
    user.last_connection = Date.now()
    let allCarts = await cartManager.getCart();
    if (allCarts.length !== 0) {
        // await cartManager.deleteAllCarts()
    }

    if (req.cookies.Admin) {
        // Si existe la cookie 'Admin', eliminarla
        res.clearCookie('Admin');
    }

    if (req.cookies.Premium) {
        // Si existe la cookie 'Premium', eliminarla
        res.clearCookie('Premium');
    }

    if (req.cookies.User) {
        // Si existe la cookie 'User', eliminarla
        res.clearCookie('User');
    }

    res.redirect('/');
};