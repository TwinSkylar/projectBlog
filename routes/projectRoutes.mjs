import express from "express";
import Project from "./../models/project.mjs";

const router = express.Router();

// project routes
router.get("/", (req, res) => {
    Project.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("index", { title: "All Projects", projects: result });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.post("/", (req, res) => {
    const tags = ["test1, test2, test3"];
    const project = new Project(req.body);
    project.tag = tags;
    project
      .save()
      .then((result) => {
        res.redirect("projects");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get("/create", (req, res) => {
    res.render("create", { title: "Create a new project" });
  });
  

  
  router.get("/add-project", (req, res) => {
    const project = new Project({
      title: "Pokemon Store 2",
      codeUrl: "https://github.com/TwinSkylar/shoppingcart",
      pageUrl: "https://twinskylar.github.io/shoppingcart/",
      tag: ["javascript", "html", "react", "css"],
      description: "A pokemon store which lets you fill up a shopping cart",
    });
    project
      .save()
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.get("/all-projects", (req, res) => {
    Project.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/:id", (req, res) => {
    const id = req.params.id;
    Project.findById(id)
      .then((result) => {
        res.render("details", { project: result, title: "Project Details" });
      })
      .catch((err) => {
        console.log(err);
      });
  });
  
  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Project.findByIdAndDelete(id)
      .then((result) => {
        res.json({redirect: '/projects'})
      })
      .catch((err) => {
        console.log(err);
      });
  });
  export default router;