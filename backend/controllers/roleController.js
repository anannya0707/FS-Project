const Role = require('../models/Role');

// ✅ Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({});
    res.status(200).json(roles);
  } catch (error) {
    console.error('Error fetching roles:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Add a new role
const addRole = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Role name is required' });
    }

    // Check if role already exists
    const existingRole = await Role.findOne({ name });
    if (existingRole) {
      return res.status(409).json({ message: 'Role already exists' });
    }

    const newRole = new Role({ name });
    const savedRole = await newRole.save();

    res.status(201).json(savedRole);
  } catch (error) {
    console.error('Error adding role:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllRoles,
  addRole,
};
