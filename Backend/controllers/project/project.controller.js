const Project = require("../../model/project.js");
const { asyncHandler } = require("../../services/async.handler.js");

const createProject = asyncHandler(async (req, res) => {
  const { name, project_type_id, location, site_area, description } = req.body;

  if (!name || !project_type_id) {
    return res.status(400).json({
      success: false,
      message: "Project name and project type are required.",
    });
  }

  const project = await Project.create({
    name,
    project_type_id,
    location,
    site_area,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Project created successfully.",
    data: project,
  });
});

const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.findAll({
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({
    success: true,
    data: projects,
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, project_type_id, location, site_area, description } = req.body;

  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found.",
    });
  }

  await project.update({
    name,
    project_type_id,
    location,
    site_area,
    description,
  });

  res.status(200).json({
    success: true,
    message: "Project updated successfully.",
    data: project,
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByPk(id);

  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Project not found.",
    });
  }

  await project.destroy();

  res.status(200).json({
    success: true,
    message: "Project deleted successfully.",
  });
});

module.exports = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
