// File: controllers/userInfoController.js
const UserInfo = require('../models/UserInfo');

// Create or update user info
exports.saveUserInfo = async (req, res) => {
  try {
    const { firstName, lastName, phone, address, city, country, dob, gender, zipCode, profilePicture } = req.body;
    const userId = req.user.user.id;

    // Check if user info exists
    let userInfo = await UserInfo.findOne({ userId });

    if (userInfo) {
      // Update existing user info
      userInfo = await UserInfo.findOneAndUpdate(
        { userId },
        { firstName, lastName, phone, address, city, country, dob, gender, zipCode, profilePicture },
        { new: true }
      );
    } else {
      // Create new user info
      userInfo = new UserInfo({
        userId,
        firstName,
        lastName,
        phone,
        address,
        city,
        country,
        profilePicture,
        dob, gender, zipCode
      });

      await userInfo.save();
    }

    res.json(userInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get user info
exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user.user.id;
    const userInfo = await UserInfo.findOne({ userId });

    if (!userInfo) {
      return res.status(404).json({ message: 'User information not found' });
    }

    res.json(userInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};