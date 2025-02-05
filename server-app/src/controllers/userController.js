const userService = require('../services/userService');

const userController = {
  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      // Input validation: Check if userId is provided and is a valid ObjectId.
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error); // Log the error for debugging
      res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  },
  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      // Input validation: Check if userId is provided and is a valid ObjectId.
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const updatedUser = await userService.updateUser(userId, req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error); // Log the error for debugging
      res.status(400).json({ error: error.message || 'Bad Request' });
    }
  }
};

module.exports = userController;
