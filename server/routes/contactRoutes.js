const express = require("express");
const { submitContact, getAllContacts } = require("../controllers/contactController");

const router = express.Router();

router.post("/submit", submitContact);
router.get("/get", getAllContacts);

module.exports = router;
