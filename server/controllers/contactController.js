const Contact = require("../models/contactModel");

// POST: Save new contact message
const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: "Contact message submitted successfully." });
  } catch (error) {
    console.error("Contact submission error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// GET: Fetch all contact messages
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts); // directly send array
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    res.status(500).json({ error: "Failed to retrieve contacts." });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
};
