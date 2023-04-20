const Product = require('../models/Product')

const getProduct = async(req,res)=> {
  try {
    const misProductos = await Product.find();

    res.json({Status: "true", msj: "Leer productos", info: misProductos})
  } catch (error) {
    res.Status(500).json({Status: "false", msj: "No se puede leer los productos"})
  }
}
const getProductById = async(req, res) => {
  const { id } = req.params;
  try {
       const miProducto = await Product.findById(id);
       console.log(miProducto)

      res.json({success: true, msg: "Producto obtenido", info: miProducto})

      console.log(miProducto)
      
  } catch (error) {
      res.status(500).json({success: false, message: error.message})
  }
}


const createProduct = async(req,res)=> {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save()
    res.json({Status: "true", msj: "Se crea producto productos", info: newProduct})
  } catch (error) {
    res.status(500).json({Status: "false", msj: "No se puede crear el producto " + error.message})
  }

}

const deleteProduct = async(req,res) => {
  try {
        
        const {id} = req.params;
        const productDelete =  await Product.findByIdAndDelete(id)
        res.json({Status: "true", msj: "Se elimina producto ", info: productDelete})
  } catch (error) {
    res.status(500).json({Status: "false", msj: "No se puede eliminar  el producto " + error.message})
  }
}

const updateProduct = async(req,res) => {
  try {
    const contenido = req.body;
    const { id }  = req.params;
    console.log( "id: producti" + id);
    const newProduct = await Product.findByIdAndUpdate(id,contenido,{new: true})
    res.json({Status: "true", msj: "Se actualiza producto ", info: newProduct})

} catch (error) {
res.status(500).json({Status: "false", msj: "No se puede actualizar el producto " + error.message})
}

}
    

module.exports ={getProduct,createProduct,updateProduct,deleteProduct,getProductById}