//routes ..auth.js

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");


// Register a new user

router.post("/register", async (req, res) => {

  try {
    // Validate request body
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check for existing user with the same username
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({ username: req.body.username, email: req.body.email, password: hashedPassword, });

    // Save user and return response
    const user = await newUser.save();
    res.status(200).json({ userId: user._id, username: user.username });
  } catch (err) {
    console.error(err); // Log the error
   
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);

    if (!validPassword) {
      return res.status(404).json("Wrong password");
    }

    // Only reach this point if user is found and password is valid
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;


