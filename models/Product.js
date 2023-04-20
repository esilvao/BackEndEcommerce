const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  categoria: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 25
  },
  subCategoria: {
    type: String,
    required: true
  },
  SKU: {
    type: String,
    unique: true,
    required: true,
    maxLength:15,
    minLength:10   
  },
  producto: {
    type: String,
    required: true,
    maxLength:20,
    minLength:8
  },
  marca: {
    type: String,
    required: true,
    maxLength:10,
    minLength:3
  },
  precio: {
    type: Number,
    required: true,
    min:1000,
    max:200000,
    match:[/^[0-9]$/g]
  },
  genero: {
    type: String,
    required: true,
    enum: ['Mujer', 'Hombre','Unisex'],
    message: '{VALUE} esta valor no, los valores permitidos son (Mujer,Hombre,Unisex)'
  },
  talla: {
    type: String,
    required: true,
    max: 3,
    min: 1
  },  
  color: {
    type: String,
    required: true,
    min: 3,
    max: 15
  },
  material: {
    type: String,
    required: true,
    maxLength:15,
    minLength:5  
  },
  temporada:{
    type: String,
    required: true,
    enum: ['Primavera/Verano','Otoño/Invierno'],
    message: '{VALUE} esta valor no, los valores permitidos son (Verano,Invierno,Primavera/Verano,Otoño/Invierno)'
},
dateUpdate: { 
  type: Date, 
  default: 
  Date.now 
},
stock: {
  type: Number,
  min: 0,
  max: 300
},  
bodega: {
  type: String,
  required: true,
  max: 5,
  min: 5,
  match:[/[a-z0-9]{5}/g]
},
image: {
  type: String,
  required: true,
}
})

const Product = mongoose.model('product',productSchema)
module.exports = Product;