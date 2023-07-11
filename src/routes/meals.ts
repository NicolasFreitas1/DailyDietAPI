import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../database";
import { randomUUID } from "node:crypto";
import { checkUserIdExists } from "../middlewares/check-user-id-exists";
// import { checkSessionIdExists } from "../middlewares/check-session-id-exists";

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [checkUserIdExists],
    },
    async (request, reply) => {
      const createMealsSchema = z.object({
        meal_name: z.string(),
        meal_description: z.string(),
        is_inside: z.boolean(),
      });

      const { meal_name, meal_description, is_inside } =
        createMealsSchema.parse(request.body);

      const { user_id } = request.cookies;

      await knex("meals").insert({
        meal_id: randomUUID(),
        meal_name,
        meal_description,
        is_inside,
        user_id,
      });

      return reply.status(201).send();
    }
  );
}
