import { z } from 'zod';

// Creating an object schema
export const NoteValidationSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "Title must be at least of 1 chars." }),

    description: z
        .string()
        .trim()
        .min(1, { message: "Description must be at least of 1 chars." }),

    tag: z
        .string()
        .optional(),
})


