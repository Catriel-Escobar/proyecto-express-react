import { z } from "zod";

const statusEnum = [
  "pending",
  "onHold",
  "inProgress",
  "underReview",
  "completed",
] as const;

// El tipo 'Status' es una unión de los valores de 'statusEnum'
type Status = (typeof statusEnum)[number];

const statusEnumSchema = z.enum(statusEnum);

export const statusSchema = z.object({
  status: statusEnumSchema,
});
