const Material = require('../models/Material');

// ✅ Get all materials
exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate('addedBy', 'name email');
    res.status(200).json(materials);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get one material
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('addedBy', 'name email');
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.status(200).json(material);
  } catch (err) {
    console.error('Error fetching material:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Create material
exports.createMaterial = async (req, res) => {
  try {
    const { name, description, category, quantity, status, vendor } = req.body;

    // Validate required fields
    if (!name || !category || quantity == null || !status || !vendor) {
      return res.status(400).json({
        message: 'Name, category, quantity, status, and vendor are required',
      });
    }

    // Create a new material document
    const newMaterial = new Material({
      name,
      description,
      category,
      quantity,
      status,
      vendor,
      addedBy: req.user?.id || null,
    });

    const savedMaterial = await newMaterial.save();
    res.status(201).json(savedMaterial);
  } catch (err) {
    console.error('Error creating material:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

// ✅ Update material
exports.updateMaterial = async (req, res) => {
  try {
    const { name, description, category, quantity, status, vendor } = req.body;

    const updatedMaterial = await Material.findByIdAndUpdate(
      req.params.id,
      { name, description, category, quantity, status, vendor },
      { new: true, runValidators: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.status(200).json(updatedMaterial);
  } catch (err) {
    console.error('Error updating material:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Delete material
exports.deleteMaterial = async (req, res) => {
  try {
    const deleted = await Material.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.status(204).send(); // No content
  } catch (err) {
    console.error('Error deleting material:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
