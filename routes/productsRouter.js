const express = require("express");
const { Router } = express;
let productsRouter = new Router();

const Contenedor = require('../components/products/index');
let archivo = new Contenedor('productos.json');
let chat = new Contenedor("chat.json")

    

productsRouter.get('/', async (req, res, next) => {
        const products = await archivo.getAll();
        products.length > 0 ? res.render('prods', {products}) : res.send({ error: "archivo no encontrado" })
    })
    
    productsRouter.post('/', async (req, res, next) => {
        const addProd = req.body;
        await archivo.save(addProd);
        res.redirect('/')
    })   

    productsRouter.get('/:id', async (req, res, next) => {
        try {
            let id = req.params.id;
            let product = await archivo.getById(id);
            res.send(product);
        } catch (error) {
            console.log(error);
        }
    });

    module.exports = productsRouter;
