import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateSchemaBody } from "../middlewares/validate.body";
import CreateAuthSchema, {
  LoginSchema,
  TokenConfirmCreateAuthSchema,
  UserMail,
} from "../schemas/authSchema.zod";

const router = Router();

router.post(
  "/create-account",
  validateSchemaBody(CreateAuthSchema),
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  validateSchemaBody(TokenConfirmCreateAuthSchema),
  AuthController.confirmAccount
);

router.post(
  "/login",
  validateSchemaBody(LoginSchema),
  AuthController.loginAccount
);

router.post(
  "/request-code",
  validateSchemaBody(UserMail),
  AuthController.requestConfirmationCode
);
export default router;
