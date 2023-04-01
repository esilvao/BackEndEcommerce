const mongoose = require('mongoose');
const ordenSchema = require('../models/OdenCompra');

const getOrdenCompra = async(res,req)=>{
console.log("getOrdenCompra");
}

const updateOrdenCompra = async(res,req)=>{
  console.log("updateOrdenCompra");
}

const createOrdenCompra = async(res,req)=>{
  console.log("createOrdenCompra");
}
const deleteOrdenCompra = async(res,req)=>{
  console.log("deleteOrdenCompra");
}

module.exports = {deleteOrdenCompra,createOrdenCompra,updateOrdenCompra,getOrdenCompra}


