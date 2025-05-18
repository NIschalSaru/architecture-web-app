const Client = require("./client.js");
const Project = require("./project.js");
const ProjectType = require("./projectType.js");
const Media = require("./media.js");
ProjectType.hasMany(Project, { foreignKey: "project_type_id" });
Project.belongsTo(ProjectType, { foreignKey: "project_type_id" });

// Project -> Client
Project.hasOne(Client, { foreignKey: "project_id" });
Client.belongsTo(Project, { foreignKey: "project_id" });

// Project -> Media
Project.hasMany(Media, { foreignKey: "project_id" });
Media.belongsTo(Project, { foreignKey: "project_id" });

module.exports = {
  Client,
  Project,
  ProjectType,
  Media,
};
