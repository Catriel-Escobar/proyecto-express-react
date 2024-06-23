import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { validateSchemaBody } from "../middlewares/validate.body";
import { validateSchemaParams } from "../middlewares/validate.params";
import { createProjectSchema } from "../schemas/projectSchema.zod";
import {
  ObjectIdSchema,
  ObjectIdSchemaObj,
} from "../schemas/objectIdSchema.zod";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middlewares/validate.project";
import { createTaskSchema } from "../schemas/taskSchema.zod";
import { statusSchema } from "../schemas/statusSchema.zod";
import { authValidate } from "../middlewares/validate.auth";
import { UserMail } from "../schemas/authSchema.zod";
import { TeamMemberController } from "../controllers/TeamController";
import { hasAuthorization, validateTask } from "../middlewares/validate.task";

const router = Router();

router.use(authValidate);

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
  hasAuthorization,
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
  validateTask,
  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "taskId"),
  validateTask,
  hasAuthorization,
  validateSchemaBody(createTaskSchema),
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "taskId"),
  validateTask,
  hasAuthorization,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "taskId"),
  validateSchemaBody(statusSchema),
  validateTask,
  TaskController.updateStatus
);

//! /** ROUTES FOR TEAMS */

router.post(
  "/:projectId/team/find",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaBody(UserMail),
  TeamMemberController.findMemberByEmail
);

router.get(
  "/:projectId/team",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  TeamMemberController.getProjectTeam
);
router.post(
  "/:projectId/team",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaBody(ObjectIdSchemaObj),
  TeamMemberController.addMemberById
);

router.delete(
  "/:projectId/team/:userId",
  validateSchemaParams(ObjectIdSchema, "projectId"),
  validateSchemaParams(ObjectIdSchema, "userId"),
  TeamMemberController.removeMemberById
);
export default router;
