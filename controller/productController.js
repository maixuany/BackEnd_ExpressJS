const ProductSch = require("../modules/product");
const ProductController = {}

ProductController.createProduct = async(req, res)=>{
    const product = new ProductSch({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image
    })

    try{
        await product.save();
        return res.status(200).send(product);
    }catch(error){
        return res.status(401).send(error);
    }
}

ProductController.getProduct = async(req, res)=>{
    const id_product =req.params.id_product.toString();
    try{
        const product = await ProductSch.findById(id_product);
        return res.status(200).send(product);
    }catch(error){
        return res.status(204).send("NO CONTENT");
    }
}

ProductController.getAllProduct = async(req, res)=>{
    try{
        const listProduct = await ProductSch.find();
        return res.status(200).send(listProduct);
    }catch(error){
        return res.status(204).send("NO CONTENT");
    }
}

ProductController.editProduct = async(req, res)=>{
    const id_product =req.params.id_product.toString();
    try{
        const product = await ProductSch.findById(id_product);
        product.name = req.body.name
        product.price = req.body.price
        product.image = req.body.image
        product.save()
        return res.status(200).send(product);
    }catch(error){
        return res.status(401).send(error.toString());
    }
}

ProductController.deleteProduct = async(req, res)=>{
    const id_product =req.params.id_product.toString();
    try{
        const product = await ProductSch.findById(id_product);
        product.delete();
        return res.status(200).send({});
    }catch(error){
        return res.status(401).send(error.toString());
    }
}

module.exports = ProductController;