import { Router } from "express";
import { authValidate } from "../middlewares/validate.auth";
import { ProfileController } from "../controllers/ProfileController";
import { validateSchemaBody } from "../middlewares/validate.body";
import {
  ProfileUpdate,
  UpdateCurrentUserPassword,
} from "../schemas/authSchema.zod";

const router = Router();

router.use(authValidate);

router.put(
  "/",
  validateSchemaBody(ProfileUpdate),
  ProfileController.updateProfile
);

router.post(
  "/update-password",
  validateSchemaBody(UpdateCurrentUserPassword),
  ProfileController.updateCurrentUserPassword
);

export default router;
