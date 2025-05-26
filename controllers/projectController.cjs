const Project = require('../model/Project.cjs');  // this is your model

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();  
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err });
  }
};

// POST new project
exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);  
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: 'Error creating project', error: err });
  }
};
