const User = require('../models/User');

const userService = {
  async getUserById(id) {
    try {
      // Input validation: Check if id is a valid ObjectId. Mongoose will throw an error if it's not.
      const user = await User.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.error("Error fetching user by ID:", error); // Log the error for debugging
      if (error.name === 'CastError') {
        throw new Error('Invalid user ID');
      }
      throw error; // Re-throw the error to be handled by the controller
    }
  },
  async updateUser(id, userData) {
    try {
      // Input validation: Check if id is a valid ObjectId. Mongoose will throw an error if it's not.
      // Add more robust validation here for userData as needed.
      const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
      if (!updatedUser) {
        throw new Error('User not found');
      }
      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error); // Log the error for debugging
      if (error.name === 'CastError') {
        throw new Error('Invalid user ID');
      }
      throw error; // Re-throw the error to be handled by the controller
    }
  }
};

module.exports = userService;
