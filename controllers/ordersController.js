const Orders = require('../models/Orders');


//ADD orders
exports.add = async (req, res, next) => {
    try {
        const order = new Orders(req.body);
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(400).json({message: 'Error in Request'});
    }
};

// GET ALL ORDERS
exports.list = async (req, res, next) => {
    try {
        const orders = await Orders.find({})
            .populate('customer')
            .populate({
                path: 'products.product',
                model: 'Products'
            });

        res.json(orders);

    } catch (error) {
        res.status(400).json({message: 'Error in Request'});
    }
};

// Get by Id
exports.show = async (req, res, next) => {
    try{
        const order = await Orders.findById(req.params.id)
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });
        if(!order){
            res.status(404).json({message : 'The Order not exist!'});
            next();
        }

        res.json(order);
    }
    catch(error){
        res.status(400).json({message: 'Error in Request'});
    }
};

//Update
exports.update = async (req, res, next) => {
    try {
        const order = await Orders.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        )
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });

        res.json(order);
    } catch (error) {
        res.status(400).json({message: 'Error in Request'}); 
    }
}


//Delete
exports.delete = async (req, res, next) => {
    try {
        await Orders.findOneAndDelete({_id: req.params.id});
        res.json({message: 'La orden ha slido eliminada'})
    } catch (error) {
        res.status(400).json({message: 'Error in Request'}); 
    }
}

exports.byCustomer = async (req, res, next) => {
    try {
        const orders = await Orders.find({customer: req.params.id})
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        });
        res.json(orders)
    } catch (error) {
        res.status(400).json({message: 'Error in Request'});
    }
};