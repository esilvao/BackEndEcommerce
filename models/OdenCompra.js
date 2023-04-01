const mogoose = require('mongoose');

const ordenCompraSchema = mogoose.Schema({
  nroOrden:{
    type: Number,
    min:1000,
  },
  rutCliente: {
    type: String,
    maxLength: 10,
    minLength: 10,
    required: true,
    mach:[/^[0-9]+[-|‐]{1}[0-9kK]{1}$/g]
  },
  totalCompra:{
    type: Number,
    required: true
  }, 
  mediodePago:{
    type: String,
    required: true,
    enum: ['Credito', 'Debito','Prepago'],
    message: '{VALUE} esta valor no, los valores permitidos son (Credito,Debito,Prepago)'
  }, 
  fechaCompra:{
    type: Date
  },
  detalleCompra:{
    SKU:{
      type: String,
      required: true,
      maxLength:15,
      minLength:10  
    },
    producto:{
      type: String,
      required: true,
      maxLength:20,
      minLength:8
    },
    cantidad:{
      type: Number,
      max:100
    },
    precioTotal:{
      type: Number
    },
  }


})

const orden = mogoose.model('orden',ordenCompraSchema)

module.exports = orden