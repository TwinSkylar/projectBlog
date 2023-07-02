import Project from "./../models/project.mjs";

// project_index,blog_details,blog_create_get,blog_create_post,blog_delete

const project_index = (req, res) => {
  Project.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("projects/index", { title: "All Projects", projects: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const project_details = (req, res) => {
  const id = req.params.id;
  Project.findById(id)
    .then((result) => {
      res.render("projects/details", { project: result, title: "Project Details" });
    })
    .catch((err) => {
        res.status(404).render("404", { title: "404 - Project Not Found" });
    })
}

const project_create_get = (req, res) => {
  res.render("projects/create", { title: "Create a new project" });
};

const project_create_post = (req, res) => {
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
};

const project_delete = (req, res) => {
  const id = req.params.id;
  Project.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/projects" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const add_project = (req, res) => {
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
};

export {
  project_index,
  project_details,
  project_create_get,
  project_create_post,
  project_delete,
  add_project,
};
