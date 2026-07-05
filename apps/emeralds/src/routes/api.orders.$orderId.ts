import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/lib/supabase-server";

export const Route = createFileRoute("/api/orders/$orderId")({
	server: {
		handlers: {
			GET: async ({ params }) => {
				const { orderId } = params;

				const { data, error } = await supabaseAdmin
					.from("orders")
					.select("*, order_items(*)")
					.eq("id", orderId)
					.single();

				if (error || !data) {
					return new Response("Order not found", { status: 404 });
				}

				return Response.json(data);
			},
		},
	},
});
