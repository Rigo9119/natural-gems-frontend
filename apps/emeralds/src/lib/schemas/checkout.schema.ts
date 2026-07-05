import { z } from "zod";

export const checkoutSchema = z.object({
	nombre: z.string().min(1, "El nombre es requerido"),
	whatsapp: z.string().min(7, "Ingresa un número de WhatsApp válido"),
	email: z
		.string()
		.email("Email inválido")
		.optional()
		.or(z.literal(""))
		.transform((v) => v ?? ""),
	shipping_address: z.string().min(1, "La dirección de envío es requerida"),
	shipping_country: z.string().min(1, "El país de destino es requerido"),
	notas: z.string().optional().default(""),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
