import { z } from "zod";

export const contactSchema = z.object({
	name: z.string().min(1, "El nombre es requerido"),
	email: z.string().min(1, "El email es requerido").email("Email inválido"),
	subject: z.string().min(1, "El asunto es requerido"),
	message: z.string().min(1, "El mensaje es requerido"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
