const express = require('express');
const router = express.Router();
const Contact = require('../Model/Contacts');

// Get all contacts
/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Returns a list of users contacts
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a new contact
/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: add a new contact to the list of contacts
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/contacts', async (req, res) => {
  try {
    const contact = new Contact(req.body);
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