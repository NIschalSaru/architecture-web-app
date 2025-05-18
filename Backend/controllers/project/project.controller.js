const { Client, Project } = require("../../model/index.js");
const { asyncHandler } = require("../../services/async.handler.js");

const createProject = asyncHandler(async (req, res) => {
  const {
    name,
    project_type_id,
    location,
    site_area,
    description,
    client_name,
    client_email,
    client_mobile,
    client_address,
  } = req.body;
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
  let client = null;
  if (client_name && (client_email || client_mobile)) {
    client = await Client.create({
      project_id: project.id,
      fullName: client_name,
      email: client_email,
      mobile: client_mobile,
      address: client_address,
    });
  }
  res.status(201).json({
    success: true,
    message: "Data created successfully.",
    data: {
      project,
      client,
    },
  });
});

const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    project_type_id,
    location,
    site_area,
    description,
    client_name,
    client_email,
    client_mobile,
    client_address,
  } = req.body;
  const project = await Project.findByPk(id);
  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Data not found.",
    });
  }
  await project.update({
    name,
    project_type_id,
    location,
    site_area,
    description,
  });
  let client = await Client.findOne({ where: { project_id: id } });
  if (client_name || client_email || client_mobile) {
    if (client) {
      await client.update({
        fullName: client_name,
        email: client_email,
        mobile: client_mobile,
        address: client_address,
      });
    }
  }
  res.status(200).json({
    success: true,
    message: "Data updated successfully.",
    data: {
      project,
      client,
    },
  });
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByPk(id);
  if (!project) {
    return res.status(404).json({
      success: false,
      message: "Data not found.",
    });
  }
  const client = await Client.findOne({ where: { project_id: id } });
  if (client) {
    await client.destroy();
  }
  await project.destroy();
  res.status(200).json({
    success: true,
    message: "Data deleted successfully.",
  });
});

const getClientByProjectTypeId = asyncHandler(async (req, res) => {
  const { project_type_id } = req.params;

  const clients = await Client.findAll({
    include: [
      {
        model: Project,
        as: "project",
        where: { project_type_id },
      },
    ],
  });

  if (!clients || clients.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No clients found for this project type.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Data fetched successfully.",
    data: clients,
  });
});

const getProjectByClientId = asyncHandler(async (req, res) => {
  const { client_id } = req.params;
  const client = await Client.findByPk(client_id, {
    include: [
      {
        model: Project,
        as: "project",
      },
    ],
  });

  if (!client) {
    return res.status(404).json({
      success: false,
      message: "Data not found.",
    });
  }
  if (!client.project) {
    return res.status(404).json({
      success: false,
      message: "No project found for this client.",
    });
  }
  res.status(200).json({
    success: true,
    message: "Data fetched successfully.",
    data: {
      // project: client.project,
      client,
    },
  });
});

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getClientByProjectTypeId,
  getProjectByClientId,
};
