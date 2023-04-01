const mongose = require('mongoose');
mongose.set('strictQuery',true);
mongose.connect(process.env.MONGODB).then(() => console.log("ingreso base de datos"))