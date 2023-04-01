const mongoose = require('mongoose');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const directionSchema = new mongoose.Schema({
  region: {
    type: String,

    required: true,

    minLength: 10,

    maxLength: 20,

  },

  comuna: {

    type: String,

    required: true,

    minLength: 5,

    maxLength: 20,

  },

  calle: {

    type: String,

    required: true,

    minLength: 5,

    maxLength: 20,

  },

  numero: {

    type: Number,

    required: true,

    max: 10000,
    min: 0

  }

})
const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
    mach: [/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/g]
  },
  apellido: {
    type: String,
    minLength: 3,
    maxLength: 30,
    required: true,
    mach: [/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/g]
  },
  telefono: {
    type: String,
    required: true,
    match: [/(\+56)?[ -]*(9)[ -]*([0-9][ -]*){8}/g]
  },
  email: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 25,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  salt: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  direccionesDespacho: [directionSchema]

})

userSchema.methods.hashpasswod = function (password) {
  this.salt = crypto.randomBytes(10).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 10, "sha512").toString('hex');
}

userSchema.methods.validarpasswod = function (password, salt, passwordDB) {
  console.log("validarpasswod.." + password)
  const passwordCrypto = crypto.pbkdf2Sync(password, salt, 1000, 10, "sha512").toString('hex');
  return passwordCrypto === passwordDB;
}
userSchema.methods.nose = function () {
  console.log(generartoken)
  payload = {
    email: this.email,
    nombre: this.nombre,
    apellido: this.apellido
  }
  // tokent (datos enviados(payload), palabra secreta, tiempo de expiracion)
  const token = jwt.sign(payload, process.env.SECRET, 1800000)
  console.log(token)
  return token
}
userSchema.methods.generartoken = function () {

  const payload = {
    id: this._id,
    email: this.email,
    isAdmin: this.isAdmin,
  }

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' })
  return token
}

const User = mongoose.model('user', userSchema);

module.exports = User;