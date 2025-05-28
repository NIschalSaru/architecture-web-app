const { Client, Project, Media } = require("../../model/index.js");
const { asyncHandler } = require("../../services/async.handler.js");
const path = require("path");
const dayjs = require("dayjs");
const fs = require("fs");
const {
  uploadSingleImage,
  deleteImage,
} = require("../../middleware/cloudinary.js");
const { sequelize } = require("../../database/models/index.js");

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

  const t = await sequelize.transaction();
  let project,
    client = null;
  let mediaData = [];
  try {
    project = await Project.create(
      {
        name,
        project_type_id,
        location,
        site_area,
        description,
      },
      { transaction: t }
    );
    if (client_name && (client_email || client_mobile)) {
      client = await Client.create(
        {
          project_id: project.id,
          fullName: client_name,
          email: client_email,
          mobile: client_mobile,
          address: client_address,
        },
        { transaction: t }
      );
    }
    const files = req.files;
    const folderName = dayjs().format("YYYYMMDD");
    const uploadFolder = `/uploads/${folderName}`;
    const fullLocalFolder = path.join(__dirname, "../../storage", uploadFolder);

    if (files.image && files.image.length > 0) {
      const feature = files.image[0];
      const localPath = path.join(fullLocalFolder, feature.filename);
      const fileBuffer = fs.readFileSync(localPath);
      const cloudinaryUrl = await uploadSingleImage(
        fileBuffer,
        feature.filename
      );

      mediaData.push({
        project_id: project.id,
        image_type: "feature",
        filename: feature.filename,
        filepath: `${uploadFolder}/${feature.filename}`,
        fileurl: cloudinaryUrl,
      });
    }

    if (files.gallery && files.gallery.length > 0) {
      for (const file of files.gallery) {
        const localPath = path.join(fullLocalFolder, file.filename);
        const fileBuffer = fs.readFileSync(localPath);
        const cloudinaryUrl = await uploadSingleImage(
          fileBuffer,
          file.filename
        );

        mediaData.push({
          project_id: project.id,
          image_type: "gallery",
          filename: file.filename,
          filepath: `${uploadFolder}/${file.filename}`,
          fileurl: cloudinaryUrl,
        });
      }
    }

    if (mediaData.length > 0) {
      await Media.bulkCreate(mediaData, { transaction: t });
    }
    await t.commit();
    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: {
        project,
        client,
        media: mediaData,
      },
    });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      success: false,
      message: "Project creation failed during media or client processing.",
      error: error.message,
    });
  }
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
  const t = await sequelize.transaction();
  try {
    const project = await Project.findByPk(id, { transaction: t });
    if (!project) {
      await t.rollback();
      return res.status(404).json({
        success: false,
        message: "Data not found.",
      });
    }
    await project.update(
      {
        name,
        project_type_id,
        location,
        site_area,
        description,
      },
      { transaction: t }
    );
    let client = await Client.findOne({
      where: { project_id: id },
      transaction: t,
    });
    if (client_name || client_email || client_mobile) {
      if (client) {
        await client.update(
          {
            fullName: client_name,
            email: client_email,
            mobile: client_mobile,
            address: client_address,
          },
          { transaction: t }
        );
      } else {
        client = await Client.create(
          {
            project_id: id,
            fullName: client_name,
            email: client_email,
            mobile: client_mobile,
            address: client_address,
          },
          { transaction: t }
        );
      }
    }
    const files = req.files;
    const folderName = dayjs().format("YYYYMMDD");
    const uploadFolder = `/uploads/${folderName}`;
    const fullLocalFolder = path.join(__dirname, "../../storage", uploadFolder);
    const mediaData = [];
    if (files.image && files.image.length > 0) {
      const oldFeatureImage = await Media.findOne({
        where: { project_id: id, image_type: "feature" },
        transaction: t,
      });
      if (oldFeatureImage) {
        const sanitizedPath = oldFeatureImage.filepath.replace(/^\/+/, "");
        const fullPath = path.join(__dirname, "../../storage", sanitizedPath);
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
        }
        await oldFeatureImage.destroy({ transaction: t });
        try {
          await deleteImage(oldFeatureImage.fileurl);
        } catch (err) {
          console.error("Cloudinary deletion failed:", err.message);
        }
      }
      const feature = files.image[0];
      const localPath = path.join(fullLocalFolder, feature.filename);
      const fileBuffer = fs.readFileSync(localPath);
      const cloudinaryUrl = await uploadSingleImage(
        fileBuffer,
        feature.filename
      );
      mediaData.push({
        project_id: id,
        image_type: "feature",
        filename: feature.filename,
        filepath: `${uploadFolder}/${feature.filename}`,
        fileurl: cloudinaryUrl,
      });
    }
    if (files.gallery && files.gallery.length > 0) {
      for (const file of files.gallery) {
        const localPath = path.join(fullLocalFolder, file.filename);
        const fileBuffer = fs.readFileSync(localPath);
        const cloudinaryUrl = await uploadSingleImage(
          fileBuffer,
          file.filename
        );
        mediaData.push({
          project_id: id,
          image_type: "gallery",
          filename: file.filename,
          filepath: `${uploadFolder}/${file.filename}`,
          fileurl: cloudinaryUrl,
        });
      }
    }
    let mediaRecords = null;
    if (mediaData.length > 0) {
      mediaRecords = await Media.bulkCreate(mediaData, { transaction: t });
    }
    await t.commit();
    res.status(200).json({
      success: true,
      message: "Data updated successfully.",
      data: {
        project,
        client,
        media: mediaRecords,
      },
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      success: false,
      message: "Something went wrong during update.",
      error: error.message,
    });
  }
});

const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const project = await Project.findByPk(id);
  if (!project) {
    return res.status(404).json({ success: false, message: "Data not found." });
  }
  const mediaFiles = await Media.findAll({ where: { project_id: id } });

  await Promise.all(
    mediaFiles.map(async (media) => {
      if (media.filepath) {
        const sanitizedPath = media.filepath.replace(/^\/+/, "");
        const fullPath = path.resolve(
          __dirname,
          "../../storage",
          sanitizedPath
        );
        if (fs.existsSync(fullPath)) {
          try {
            fs.unlinkSync(fullPath);
            console.log("Deleted local file:", fullPath);
          } catch (err) {
            console.error("Error deleting local file:", err);
          }
        }
      }
      if (media.fileurl) {
        try {
          await deleteImage(media.fileurl);
        } catch (err) {
          console.error("Failed to delete from Cloudinary:", err.message);
        }
      }
    })
  );
  await Media.destroy({ where: { project_id: id } });
  await Client.destroy({ where: { project_id: id } });
  await project.destroy();
  res
    .status(200)
    .json({ success: true, message: "Data deleted successfully." });
});

const getClientByProjectTypeId = asyncHandler(async (req, res) => {
  const { project_type_id } = req.params;
  const clients = await Client.findAll({
    include: [
      {
        model: Project,
        as: "project",
        attributes: ["id"],
        where: {
          project_type_id,
        },
        include: [
          {
            model: Media,
            as: "media",
            where: {
              image_type: "feature",
            },
          },
        ],
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
        include: [
          {
            model: Media,
            as: "media",
          },
        ],
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
      client,
    },
  });
});

const deleteMediaById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Media ID is required.",
      });
    }
    const media = await Media.findByPk(id);
    if (!media) {
      return res.status(404).json({
        success: false,
        message: "Media not found.",
      });
    }
    if (media.filepath) {
      const sanitizedPath = media.filepath.replace(/^\/+/, "");
      const localPath = path.resolve(__dirname, "../../storage", sanitizedPath);
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
        console.log("Local file deleted:", localPath);
      }
    }
    if (media.fileurl) {
      await deleteImage(media.fileurl);
    }
    await media.destroy();
    return res.status(200).json({
      success: true,
      message: "Media deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting media:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getClientByProjectTypeId,
  getProjectByClientId,
  deleteMediaById,
};
