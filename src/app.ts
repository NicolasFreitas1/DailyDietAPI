import fastify from "fastify";
import { env } from "./env";
import cookie from "@fastify/cookie";
import { userRoutes, mealsRoutes } from "./routes";

export const app = fastify();

app.register(cookie);
app.register(userRoutes, {
  prefix: "users",
});
app.register(mealsRoutes, {
  prefix: "meals",
});
