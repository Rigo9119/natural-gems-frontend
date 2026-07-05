import { z } from "zod";

export const orderLookupSchema = z.object({
	order_number: z.string().min(1, "Ingresa el número de pedido"),
	contact: z.string().min(1, "Ingresa tu email o WhatsApp"),
});

export type OrderLookupValues = z.infer<typeof orderLookupSchema>;
