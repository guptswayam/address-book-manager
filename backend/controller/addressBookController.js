const AppError = require("../utils/appError");
const AddressBook = require("./../model/addressBookModel")

exports.createAddress = async (req, res, next)=>{
    try {
        const contact = await AddressBook.create({...req.body, user: req.currentUser._id});

        res.status(200).json({
            status: "success",
            data: contact
        })


    } catch (error) {
        next(error);
    }
}

exports.updateAddress = async (req, res, next)=>{

    const newAddress = {};
    if(req.body.name)
        newAddress.name = req.body.name;
    if(req.body.number)
        newAddress.number = req.body.number;

    try {
        const address = await AddressBook.findByIdAndUpdate(req.params.id, newAddress, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data: address
        })

    } catch (error) {
        next(error);
    }
}

exports.deleteAddress = async (req, res, next)=>{
    try {
        const oldAddress = await AddressBook.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: oldAddress
        })
    } catch (error) {
        next(error);
    }
}

exports.getContactDetails = async (req, res, next)=>{
    try {
        const address = await AddressBook.findOne({_id: req.params.id, user: req.currentUser._id})
        // .populate({
        //     path: "user"
        // })

        if(!address)
            return next(new AppError("Invalid id!", 400));
        res.status(200).json({
            status: "success",
            data: address
        })
    } catch (error) {
        next(error);
    }
}

exports.getMyContacts = async (req, res, next)=>{
    try {
        const addresses = await AddressBook.find({user: req.currentUser._id})
        res.status(200).json({
            status: "success",
            data: addresses
        })
    } catch (error) {
        next(error)
    }
}