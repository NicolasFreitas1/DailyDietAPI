import fastify from "fastify";
import { env } from "./env";
import { mealsRoutes } from "./routes/meals";
import cookie from "@fastify/cookie";

export const app = fastify();

app.register(cookie);
app.register(mealsRoutes, {
  prefix: "users",
});
