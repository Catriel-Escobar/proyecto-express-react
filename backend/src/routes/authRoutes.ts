import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateSchemaBody } from "../middlewares/validate.body";
import CreateAuthSchema, {
  LoginSchema,
  NewPasswordSchema,
  TokenConfirmCreateAuthSchema,
  TokenParamConfirm,
  UserMail,
} from "../schemas/authSchema.zod";
import { validateSchemaParams } from "../middlewares/validate.params";
import { authValidate } from "../middlewares/validate.auth";

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

router.post(
  "/forgot-password",
  validateSchemaBody(UserMail),
  AuthController.forgotPassword
);

router.post(
  "/validate-token",
  validateSchemaBody(TokenConfirmCreateAuthSchema),
  AuthController.validateToken
);

router.post(
  "/update-password/:token",
  validateSchemaParams(TokenParamConfirm, "token"),
  validateSchemaBody(NewPasswordSchema),
  AuthController.updatePasswordWithToken
);
router.post("/logout", AuthController.logout);
router.get("/user", authValidate, AuthController.user);

export default router;
