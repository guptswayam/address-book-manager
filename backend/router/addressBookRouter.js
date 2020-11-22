const express = require("express");
const router = express.Router();
const addressBookController = require("./../controller/addressBookController");
const {protect} = require("./../controller/authController")

router.route("/:id").patch(protect, addressBookController.updateAddress).delete(protect, addressBookController.deleteAddress).get(protect, addressBookController.getContactDetails);

router.post("/", protect, addressBookController.createAddress);

module.exports = router;