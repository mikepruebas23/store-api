const multer = require('multer');
const multerConfig = require('../utils/multerConfig');
const Products = require('../models/Products');
const upload = multer(multerConfig).single('image');

//Upload Img
exports.fileUpload = (req, res ,next) => {
    upload(req, res,function(error){
        if(error){
            res.json({message:error})
        }
        return next();
    });
};

//Add products
exports.add = async (req, res) => {
    const product = new Products(req.body);
    try{
        //compobar si hay img
        if(req.file && req.file.filename){
            product.image = req.file.filename;
        }
        await product.save();
        res.json({message: 'New Product Added'});
    }
    catch(error){
        if(error.code === 11000){
            res.status(400).json({message:`Ya existe un producto con el sku: ${req.body.sku}`});
        }
        else {
            res.status(400).json({message: 'Error'});
        }
    }
};

//Primera Accion : List
exports.list = async (req, res) => {
    try {
        const products = await Products.find({});
        res.json(products);
    } catch (error) {
        res.status(400).json({message: 'Error'});
    }
};

// Get by Id
exports.show = async (req, res, next) => {
    try{
        const product = await Products.findById(req.params.id);
        if(!product){
            res.status(404).json({message : 'The Product not exist!'});
        }

        res.json(product);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: 'Error in Request'});
    }
};


//Update Product
exports.update = async(req, res, next) => {
    try{
        let newProduct = req.body;
        if(req.file && req.file.filename){
            newProduct.image = req.file.filename;
        }
        else {
            const product = await Products.findById(req.params.id);
            newProduct.image = product.image;
        }
        const productUpdated = await Products.findOneAndUpdate(
            {_id: req.params.id},
            newProduct,
            {new: true}
        );
        res.json({message:'Product updated'});
    }
    catch(error){
        if(error.code === 11000){
            res.status(400).json({message:`Ya existe un producto con el sku: ${req.body.sku}`});
        }
        else {
            res.status(400).json({message: 'Error'});
        }
    }
};

//Delete Product
exports.delete = async(req, res, next) => {
    try{
        await Products.findOneAndDelete({_id: req.params.id});
        res.json({message: 'Product Deleted'});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: 'Error in Request'});
    }
}

exports.search = async (req, res, next) => {
    try {
        const products = await Products.find({
            name: new RegExp(req.params.query, 'i')
        });

        res.json(products);
    } catch (error) {
        res.status(400).json({message: 'Error in Request'});
    }
}
