
const {editUser,deleteUser,createUser,getUser,login,verificarlogin} = require('../Controllers/userConbtroller');
const auth = require('../middeware/auth')

const express = require('express');

usersRouter = express.Router();


//! endpoints
usersRouter.route('/users')
    .get(getUser)    
    .post(createUser)

//usersRouter.route('/users/:userId')
//    .delete(deleteUser)
usersRouter.route('/users/delete')
    .delete(auth,deleteUser)


    //login
usersRouter.route('/users/signin')
    .post(login)
    
usersRouter.route('/users/verificarUsuario')
    .get(auth,verificarlogin)
usersRouter.route('/users/myprofile')
    .put(editUser)

module.exports = usersRouter;