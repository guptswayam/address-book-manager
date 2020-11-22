const mongoose = require("mongoose");

const addressBookSchema = new mongoose.Schema({
    number: {
        type: String,
        minlength: [10, "The number should only 10 characters long"],
        maxlength: [10, "The number should only 10 characters long"],
        unique: [true, "This number already exists"],
        required: [true, "Number must be present"]
    },
    name: {
        type: String,
        required: [true, "Name must be present"]
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "A user must be present"]
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals:  true}
})

const AddressBookModel = mongoose.model("address-books", addressBookSchema);

module.exports = AddressBookModel;