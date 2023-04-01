const { express, expressjwt } = require("express-jwt");
// se instala libreria npm i express-jwt para desencriptar token
const dotenv = require('dotenv').config(); // para usar variables de entorno



const getTocket = (req)=> {
  
const { authorization } = req.headers
console.log ("authorization : " + authorization)
console.log (" tiene aturizacion "+ authorization);
 if (authorization){
  const [type, token] = authorization.split(' ');
  console.log ("type : " + type)
  console.log ("token : " + token)
  return type ==='Bearer' ? token: null
 } 
 return null
}

const auth = expressjwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
  userProperty: 'user',
  getTocket
})

module.exports = auth