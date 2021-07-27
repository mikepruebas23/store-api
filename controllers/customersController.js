const Customers = require('../models/Customers');

//Add clients
exports.add = async (req, res) => {
    const customer = new Customers(req.body);
    try{
        await customer.save();
        res.json({message: 'New Client Added'});
    }
    catch(error){
        console.log(error);
        res.send(error);
        next();
    }
};

//Primera Accion : List
exports.list = async (req, res) => {
    try {
        const customers = await Customers.find({});
        res.json(customers);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

// Get by Id
exports.show = async (req, res, next) => {
    try{
        const customer = await Customers.findById(req.params.id);
        if(!customer){
            res.status(404).json({message : 'The Client not exist!'});
        }

        res.json(customer);
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: 'Error in Request'});
    }
};


//Update Customer
exports.update = async(req, res, next) => {
    try{
        const customer = await Customers.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        );
        res.json({message:'Client updated'});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: 'Error in Request'});
    }
};

//Delete Customer
exports.delete = async(req, res, next) => {
    try{
        await Customers.findOneAndDelete({_id: req.params.id});
        res.json({message: 'Customer Deleted'});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message: 'Error in Request'});
    }
}
