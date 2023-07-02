import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import Project from "./models/project.mjs";

const app = express();

//register view engine

app.set("view engine", "ejs");

//ejs default folder for views is in the views folder, set the path

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//connect to mongodb
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.gfd3cze.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes

app.get("/", (req, res) => {
  res.redirect("/projects");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// project routes
app.get("/projects", (req, res) => {
  Project.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Projects", projects: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/projects", (req, res) => {
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

app.get("/projects/:id", (req, res) => {
  const id = req.params.id;
  Project.findById(id)
    .then((result) => {
      res.render("details", { project: result, title: "Project Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/projects/:id", (req, res) => {
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then((result) => {
      res.json({redirect: '/projects'})
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/add-project", (req, res) => {
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
      res.redirect("projects");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-projects", (req, res) => {
  Project.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/projects/create", (req, res) => {
  res.render("create", { title: "Create a new project" });
});

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
