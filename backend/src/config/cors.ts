import { CorsOptions } from "cors";
import { envs } from "./env.config";

console.log(envs.FRONTEND_URL);
const whiteList: (string | undefined)[] = [
  envs.FRONTEND_URL,
  "http://localhost:5173",
]; // Agrega aquí todas las URLs necesarias

export const corsConfig: CorsOptions = {
  origin: function (origin, callback) {
    console.log(process.argv);
    if (process.argv[2] === "--api") {
      whiteList.push(undefined);
    }
    if (whiteList.includes(origin!)) {
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};
