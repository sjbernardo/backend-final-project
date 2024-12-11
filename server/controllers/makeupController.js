const mongoose = require('mongoose');
const Makeup = require('../../models/makeup');

// Open the connection
mongoose.connect('mongodb://127.0.0.1:27017/makeupDB')
    .then(() => {
        console.log('Connection Open');
    })
    .catch(err => {
        console.log('Error');
        console.log(err);
    });

// List of all makeup
exports.listMakeup = async(req, res) => {
    const makeups = await Makeup.find({});
    res.render('index', { makeups, successMessage: req.query.success });
}

// New makeup form
exports.newMakeup = (req, res) => {
    res.render('new');
};

// Add New makeup (values)
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

// View Specific Makeup
exports.viewMakeup = async(req, res) => {
    const makeup = await Makeup.findById(req.params.id);
    res.render('show', { makeup });
}

// Edit Makeup Form
exports.editMakeup = async(req, res) => {
    const makeup = await Makeup.findById(req.params.id);
    res.render('edit', { makeup });
}

// Update Makeup
exports.updateMakeup = async(req, res) => {
    const { name, category, quantity, price, description } = req.body;
    await Makeup.findByIdAndUpdate(req.params.id, { name, category, quantity, price, description });
    res.redirect('/makeups?success=Item updated successfully!');
}

// Delete Form
exports.delMakeupConfirmation = async(req, res) => {
    const makeup = await Makeup.findById(req.params.id);
    res.render('delete', { makeup });
}

// Delete Makeup
exports.delMakeup = async(req, res) => {
    await Makeup.findByIdAndDelete(req.params.id);
    res.redirect('/makeups?success=Item deleted successfully!');
}