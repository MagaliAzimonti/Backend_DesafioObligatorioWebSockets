const express = require('express');
const app = express();
const PORT = process.env.PORT || 8081;
let { Server : HttpServer } = require('http');
const {Server: IOServer} = require('socket.io');
let hbs = require('express-handlebars');
let serverRoutes = require('./routes')
let Socket = require('./utils/sockets')
const Contenedor = require('./components/products/index')
const archivo = new Contenedor("productos.json");
const productsRouter = require('./routes/productsRouter');
const cartRouter = require('./routes/cartRouter');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/productos', productsRouter);
app.use('/carrito', cartRouter);

app.engine('hbs', hbs.engine())
app.set('views', "views");
app.set('view engine', 'hbs');

serverRoutes(app)
let http_server = new HttpServer(app);

let io = new Socket(http_server);
io.init();

let io_socket = new IOServer(http_server)

io_socket.on('connection', async(socket) => {
    const productos = await archivo.getAll();
    socket.emit('bienvenidoLista', productos )
    

    socket.on('productoAgregado', async(data) => {
        console.log('Alguien presionó el click')
        await archivo.save(data);
        
        const productos = await archivo.getAll();
        io.sockets.emit('listaActualizada', productos);
    })

    
})



http_server.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
