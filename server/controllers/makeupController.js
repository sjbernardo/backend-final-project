const mongoose = require('mongoose');
const Makeup = require('../../models/makeup');

// Open the connection to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/makeupDB')
    .then(() => {
        console.log('Connection Open'); // Log success if connection is established
    })
    .catch(err => {
        console.log('Error'); // Log error if connection fails
        console.log(err); 
    });

// List all makeup items
exports.listMakeup = async(req, res) => {
    const makeups = await Makeup.find({});
    res.render('index', { makeups, successMessage: req.query.success });
}

// Form to add a new makeup item
exports.newMakeup = (req, res) => {
    res.render('new'); 
};

// Add a new makeup item to the database
exports.addMakeup = async(req, res) => {
    const { name, category, quantity, price, description } = req.body;
    try {
        const newMakeup = new Makeup({ name, category, quantity, price, description });
        await newMakeup.save();
        res.redirect('/makeups?success=Item created successfully!');
    } catch(err) {
        console.error("Error:", err);
        res.redirect('/makeups/new');
    }
}

// View a specific makeup item by its ID
exports.viewMakeup = async(req, res) => {
    const makeup = await Makeup.findById(req.params.id);
    res.render('show', { makeup });
}

// Form to edit an existing makeup item
exports.editMakeup = async(req, res) => {
    const makeup = await Makeup.findById(req.params.id);
    res.render('edit', { makeup });
}

// Update an existing makeup item in the database
exports.updateMakeup = async(req, res) => {
    const { name, category, quantity, price, description } = req.body;
    await Makeup.findByIdAndUpdate(req.params.id, { name, category, quantity, price, description });
    res.redirect('/makeups?success=Item updated successfully!');
}

// Delete a specific makeup item from the database
exports.deleteMakeup = async (req, res) => {
    const {id} = req.params;
    await Makeup.findByIdAndDelete(id);
    res.redirect('/makeups?success=Item deleted successfully!');
}
