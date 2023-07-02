import express from "express";
import * as projectController from "./../projectController/projectController.js";
const router = express.Router();

// project routes
router.get("/", projectController.project_index);
router.post("/", projectController.project_create_post);
router.get("/create", projectController.project_create_get);
router.get("/add-project", projectController.add_project);
router.get("/:id", projectController.project_details);
router.delete("/:id", projectController.project_delete);

export default router;
