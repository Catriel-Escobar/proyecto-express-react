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
import { NoteSchema } from "../schemas/noteSchema.zod";
import { NoteController } from "../controllers/NoteController";

const router = Router();

router.use(authValidate);

//!! MIDDLEWAREAS PARA VALIDAR PROYECT ID TASK ID Y EXISTENCIA DE AMBOS.
router.param("projectId", validateSchemaParams(ObjectIdSchema, "projectId"));
router.param("taskId", validateSchemaParams(ObjectIdSchema, "taskId"));
router.param("projectId", validateProjectExists);
router.param("taskId", validateTask);

router.post(
  "/",
  validateSchemaBody(createProjectSchema),

  ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);

router.get("/:projectId", ProjectController.getProjectById);

router.put(
  "/:projectId",
  validateSchemaBody(createProjectSchema),
  ProjectController.updateProject
);

router.delete("/:projectId", hasAuthorization, ProjectController.deleteProject);

//! TASKS

router.post(
  "/:projectId/tasks",
  validateSchemaBody(createTaskSchema),
  hasAuthorization,
  TaskController.createTask
);

router.get("/:projectId/tasks", TaskController.getProjectTasks);

router.get(
  "/:projectId/tasks/:taskId",

  TaskController.getTaskById
);

router.put(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  validateSchemaBody(createTaskSchema),
  TaskController.updateTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  hasAuthorization,
  TaskController.deleteTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  validateSchemaBody(statusSchema),
  TaskController.updateStatus
);

//! /** ROUTES FOR TEAMS */

router.post(
  "/:projectId/team/find",
  validateSchemaBody(UserMail),
  TeamMemberController.findMemberByEmail
);

router.get("/:projectId/team", TeamMemberController.getProjectTeam);
router.post(
  "/:projectId/team",
  validateSchemaBody(ObjectIdSchemaObj),
  TeamMemberController.addMemberById
);

router.delete(
  "/:projectId/team/:userId",
  validateSchemaParams(ObjectIdSchema, "userId"),
  TeamMemberController.removeMemberById
);

/** Routes for Notes */
router.post(
  "/:projectId/tasks/:taskId/notes",
  validateSchemaBody(NoteSchema),
  NoteController.createNote
);

router.get("/:projectId/tasks/:taskId/notes", NoteController.getTaskNote);

router.delete(
  "/:projectId/tasks/:taskId/notes/:noteId",
  validateSchemaParams(ObjectIdSchema, "noteId"),
  NoteController.deleteNote
);
export default router;
