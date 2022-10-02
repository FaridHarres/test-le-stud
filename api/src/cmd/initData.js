require("../mongo");

const UserModel = require("../models/user");
const ProjectModel = require("../models/project");

(async () => {
  console.log("START DELETE ALL USERS");
  await UserModel.deleteMany({});
  console.log("END DELETE ALL USERS");

  console.log("START CREATE USERS");
  const arr = [];
  arr.push({ name: "User", email: "user@gmail.com", password: "123456", costPerDay: 250, sellPerDay: 400 });

  for (let i = 0; i < arr.length; i++) {
    await UserModel.create(arr[i]);
  }
  console.log("END CREATE USERS");
})();

(async () => {
  console.log("START DELETE ALL PROJECTS");
  await ProjectModel.deleteMany({});
  console.log("END DELETE ALL PROJECTS");

  console.log("START CREATE PROJECTS");
  const arr = [];
  arr.push({ name: "Projet1", status: "active", budget_max_monthly: 10000 });
  arr.push({ name: "Projet2", status: "active" });
  arr.push({ name: "Projet3", status: "active" });

  for (let i = 0; i < arr.length; i++) {
    await ProjectModel.create(arr[i]);
  }
  console.log("END CREATE PROJECTS");
})();
