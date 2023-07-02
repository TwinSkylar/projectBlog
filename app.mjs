import express from "express";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import projectRoutes from './routes/projectRoutes.mjs'

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

//project routes
app.use('/projects',projectRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
