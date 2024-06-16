import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { validateSchemaBody } from "../middlewares/validate.body";
import { validateSchemaParams } from "../middlewares/validate.params";
import { createProjectSchema } from "../schemas/projectSchema.zod";
import { ObjectIdSchema } from "../schemas/objectIdSchema.zod";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middlewares/validate.project";
import { createTaskSchema } from "../schemas/taskSchema.zod";
import { statusSchema } from "../schemas/statusSchema.zod";

const router = Router();

router.post(
  "/",
  validateSchemaBody(createProjectSchema),

  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get(
  "/:id",
  validateSchemaParams(ObjectIdSchema, "id"),
  ProjectController.getProjectById
);

router.put(
  "/:id",
  validateSchemaParams(ObjectIdSchema, "id"),
  validateSchemaBody(createProjectSchema),
  ProjectController.updateProject
);

router.delete(
  "/:id",
  validateSchemaParams(ObjectIdSchema, "id"),
  ProjectController.deleteProject
);

//! TASKS

router.param("projectId", validateProjectExists);

router.post(
  "/:projectId/tasks",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaBody(createTaskSchema),
  TaskController.createTask
);

router.get(
  "/:projectId/tasks",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  TaskController.getProjectTasks
);

router.get(
  "/:projectId/tasks/:taskId",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "taskId"),
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "taskId"),
  validateSchemaBody(createTaskSchema),
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "taskId"),
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "taskId"),
  validateSchemaBody(statusSchema),
  TaskController.updateStatus
);
export default router;
