const express = require('express');
const Mails = require('../model/contact.cjs');
const router = express.Router();

// POST route for adding a user
router.post('/', async (req, res) => {
    try {
      const newUser = new Mails({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      });
      await newUser.save();

    } catch (err) {
      console.error('Error saving user data:', err);
      res.status(500).json('Error Saving Data')
    }
  });

// GET route for the home page
router.get('/users', async (req, res) => {
  try {
    const mails = await Mails.find();
    res.status(200).json(mails); 
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).render('index', { error: 'Error fetching user data', users: [] });
  }
});


module.exports = router;