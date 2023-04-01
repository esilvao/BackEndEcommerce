const express = require('express');
const {deleteOrdenCompra,createOrdenCompra,updateOrdenCompra,getOrdenCompra} = require('../Controllers/ordenCompraControler')

ordenRouter= express.Router();
//endpoint
ordenRouter.route('/ordenCompra')
.getOrdenCompra()
.createOrdenCompra()

ordenRouter.route('/ordenCompra/idOrden')
.deleteOrdenCompra()
.updateOrdenCompra()



