const express = require("express");
const { getMyContacts } = require("../controller/addressBookController");
const router = express.Router();
const authentication = require("./../controller/authController");
router.post("/signup", authentication.signupController);
router.post("/login", authentication.loginController);
router.get("/logout", authentication.logoutController);
router.get("/me",authentication.protect, authentication.getMe);
router.get("/get_my_contacts",authentication.protect, getMyContacts);

module.exports= router;