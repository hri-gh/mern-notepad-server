import { z } from 'zod';

// Creating an object schema
export const RegisterSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must be at least of 3 chars." })
        .max(50, { message: "Username must not be more than 50 chars" }),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "email must be at least of 3 chars." })
        .max(50, { message: "email must not be more than 50 chars" }),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(3, { message: "Password must be at least of 8 chars." })
        .max(64, { message: "Password must not be more than 64 chars" }),
})

export const LoginSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must be at least of 3 chars." })
        .max(50, { message: "Username must not be more than 50 chars" })
        .optional(),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least of 3 chars." })
        .max(50, { message: "email must not be more than 50 chars" })
        .optional(),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(3, { message: "Password must be at least of 3 chars." })
        .max(64, { message: "Password must not be more than 64 chars" }),
})
