const express = require('express');
const router = express.Router();
const Contacts = require('../Model/Contacts');
const cors = require("cors");
router.use(cors());


router.get("/list", async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.send(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.send(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.post('/contacts', async (req, res) => {
  try {
    const contact = new Contacts(req.body);
    await contact.save();
    res.send(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a contact by ID
router.put('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.send(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a contact by ID
router.delete('/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.send(contact);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;