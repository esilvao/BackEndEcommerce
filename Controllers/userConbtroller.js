const Users = require('../models/Users');
const crypto = require("crypto");


const createUser = async(req,res)=>{
  try {
    const userEmail = await Users.findOne({email: req.body.email})
    if (userEmail){
      throw new Error('El email ya se encuentra registrado')
    }
    
    ////encriptar password
    const password = req.body.password;
    //const salt = crypto.randomBytes(10).toString('hex');
    //const haspass = crypto.pbkdf2Sync(password,salt,1000,10,"sha512").toString('hex');
    //const newuser = new Users({...req.body ,password: haspass, salt: salt});
    const newuser = new Users(req.body);
    newuser.hashpasswod(password);
    await newuser.save()
    res.json({
      success: true,
      message: "Se registra usuario",
      info: newuser,
      token: newuser.generartoken()
    })
    
  
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}


const getUser = async(req,res) =>{
  try {
   // const users = await Users.find({name : "Camila"})
    const users = await Users.find()
    res.json({
      success: true,
      message: "Se leen todos los usuarios",
      info: users
    })
  } catch (error) {
    res.json({
      success: false,
      message: "No se pueden leer los usuarios!!!"})
  }
  
}

const deleteUser = async(req,res)=>{
try {
  //const id = req.params.userId
  const { id } = req.auth
  console.log("ID : "+ id)
  await Users.deleteOne({"_id" : id})
  res.json({
    success: true,
    message: `Se Eliminar usuarios : ${id}`,
     info: id})
} catch (error) {
  res.json({
    success: false,
    message: "No se puede borrar el usuario indicado!!!"})
}
}

const editUser= async(req,res)=>{
try {
  const { id,email } = req.auth
  const contain = req.body;
  
const userEdit = await Users.findOne({email: email})
if (userEdit){
  //throw new Error('El email ya se encuentra registrado')
  console.log("usuario registrado")
}  
  const updateUser = await Users.findByIdAndUpdate(id, contain, {new: true}).select('-password -salt -isAdmin');
 
  res.json({success: true, msg: "usuario actualizado", info: updateUser})
s
} catch (error) {
  res.status(500).json({
    success: false,
    message: "No se puede actualizar usuarrio"
  })
}
}
const verificarlogin = async(req,res) => {
  try {
    const { id,email } = req.auth
    console.log ( "ID ..." + id)
    console.log ( "email " + email)
    const user = await Users.findById( id ).select('-password -salt');
    res.json({
      success: true,
      message: `Informacion de : ${user.email}`,
      info: user})

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "No se puede verificar el usuario " + Error.message  
    })
  }
}

const login = async(req,res)=>{
  try {
    const { email, password } = req.body;
    const usuario = await Users.findOne({ email: email })
    console.log(usuario)
    if(usuario===null) {
      throw new Error('El email NO se encuentra registrado')
      
     // console.log('usuaio NO existe')
    }

    const validarClave = usuario.validarpasswod(password,usuario.salt,usuario.password)
    console.log(validarClave)
    if (!validarClave) {
      throw new Error("password no es validas")
      //console.log("password no es validas")
    }
    res.json({
      success: true,
      message: "Se hace login  de usuario",
      info: usuario,
      token: usuario.generartoken()
    })
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
  
    })
  }
  }
  


module.exports = {editUser,deleteUser,createUser,getUser,login,verificarlogin}