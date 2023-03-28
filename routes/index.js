const Contenedor = require('../components/products/index');
let archivo = new Contenedor('productos.json');
let chat = new Contenedor("chat.json")

module.exports = app => {
    
    app.get('/', (req, res, next) => {
        res.render('realTimeProducts', {})
    }) 

}