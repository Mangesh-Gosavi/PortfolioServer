const express = require('express');
const { getAllProjects, createProject } = require('../controllers/projectController.cjs');

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', createProject);

module.exports = router;
