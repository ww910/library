import z from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3).max(100),
  email: z.email(),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
  password: z.string().min(8).max(100)
})

export const signInSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(100)
})

export const bookSchema = z.object({
  title: z.string().trim().min(2).max(100),
  author: z.string().trim().min(2).max(100),
  description: z.string().trim().min(10).max(1000),
  genre: z.string().trim().min(2).max(50),
  rating: z.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(1000),
  coverUrl: z.string().nonempty(),
  coverColor: z.string().trim().regex(/^#[0-9A-Fa-f]{6}$/i),
  videoUrl: z.string().nonempty(),
  summary: z.string().trim().min(10).max(500),
})