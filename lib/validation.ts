import z from "zod/v3";

export const signUpSchema = z.object({
  fullName: z.string().min(3).max(100),
  email: z.string().email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8).max(100)
})

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100)
})