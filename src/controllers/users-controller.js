const usersService = require('../services/users-service');

const register = async (req, res) => {
  try {
    const result = await usersService.registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', ...result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const result = await usersService.loginUser(req.body);
    res.status(200).json({ message: 'Login successful', ...result });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {register, login};