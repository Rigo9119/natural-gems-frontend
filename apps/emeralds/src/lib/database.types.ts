export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[];

export type Database = {
	// Allows to automatically instantiate createClient with right options
	// instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
	__InternalSupabase: {
		PostgrestVersion: "14.1";
	};
	public: {
		Tables: {
			promo_codes: {
				Row: {
					id: string;
					code: string;
					type: "percentage" | "fixed";
					value: number;
					currency: string;
					description: string | null;
					valid_until: string | null;
					active: boolean;
					created_at: string | null;
				};
				Insert: {
					id?: string;
					code: string;
					type: "percentage" | "fixed";
					value: number;
					currency?: string;
					description?: string | null;
					valid_until?: string | null;
					active?: boolean;
					created_at?: string | null;
				};
				Update: {
					id?: string;
					code?: string;
					type?: "percentage" | "fixed";
					value?: number;
					currency?: string;
					description?: string | null;
					valid_until?: string | null;
					active?: boolean;
					created_at?: string | null;
				};
				Relationships: [];
			};
			promo_uses: {
				Row: {
					id: string;
					promo_code_id: string;
					customer_email: string;
					order_id: string;
					used_at: string | null;
				};
				Insert: {
					id?: string;
					promo_code_id: string;
					customer_email: string;
					order_id: string;
					used_at?: string | null;
				};
				Update: {
					id?: string;
					promo_code_id?: string;
					customer_email?: string;
					order_id?: string;
					used_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "promo_uses_promo_code_id_fkey";
						columns: ["promo_code_id"];
						isOneToOne: false;
						referencedRelation: "promo_codes";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "promo_uses_order_id_fkey";
						columns: ["order_id"];
						isOneToOne: false;
						referencedRelation: "orders";
						referencedColumns: ["id"];
					},
				];
			};
			emerald_images: {
				Row: {
					emerald_id: string;
					id: string;
					position: number;
					url: string;
				};
				Insert: {
					emerald_id: string;
					id?: string;
					position?: number;
					url: string;
				};
				Update: {
					emerald_id?: string;
					id?: string;
					position?: number;
					url?: string;
				};
				Relationships: [
					{
						foreignKeyName: "emerald_images_emerald_id_fkey";
						columns: ["emerald_id"];
						isOneToOne: false;
						referencedRelation: "emeralds";
						referencedColumns: ["id"];
					},
				];
			};
			emeralds: {
				Row: {
					carats: number;
					certificate_url: string | null;
					certified_by: string | null;
					clarity: string;
					color: string | null;
					created_at: string | null;
					currency: string;
					cut: string;
					description: string | null;
					dimensions: string | null;
					id: string;
					min_order_quantity: number;
					name: string;
					origin: string;
					price: number;
					slug: string;
					status: string;
					stone_count: number;
					total_grams: number | null;
				};
				Insert: {
					carats: number;
					certificate_url?: string | null;
					certified_by?: string | null;
					clarity: string;
					color?: string | null;
					created_at?: string | null;
					currency?: string;
					cut: string;
					description?: string | null;
					dimensions?: string | null;
					id?: string;
					min_order_quantity?: number;
					name: string;
					origin: string;
					price: number;
					slug: string;
					status?: string;
					stone_count?: number;
					total_grams?: number | null;
				};
				Update: {
					carats?: number;
					certificate_url?: string | null;
					certified_by?: string | null;
					clarity?: string;
					color?: string | null;
					created_at?: string | null;
					currency?: string;
					cut?: string;
					description?: string | null;
					dimensions?: string | null;
					id?: string;
					min_order_quantity?: number;
					name?: string;
					origin?: string;
					price?: number;
					slug?: string;
					status?: string;
					stone_count?: number;
					total_grams?: number | null;
				};
				Relationships: [];
			};
			order_items: {
				Row: {
					carats: number | null;
					clarity: string | null;
					currency: string;
					emerald_id: string;
					id: string;
					order_id: string;
					origin: string | null;
					product_name: string;
					product_slug: string;
					stone_count: number;
					unit_price: number;
				};
				Insert: {
					carats?: number | null;
					clarity?: string | null;
					currency?: string;
					emerald_id: string;
					id?: string;
					order_id: string;
					origin?: string | null;
					product_name: string;
					product_slug: string;
					stone_count?: number;
					unit_price: number;
				};
				Update: {
					carats?: number | null;
					clarity?: string | null;
					currency?: string;
					emerald_id?: string;
					id?: string;
					order_id?: string;
					origin?: string | null;
					product_name?: string;
					product_slug?: string;
					stone_count?: number;
					unit_price?: number;
				};
				Relationships: [
					{
						foreignKeyName: "order_items_emerald_id_fkey";
						columns: ["emerald_id"];
						isOneToOne: false;
						referencedRelation: "emeralds";
						referencedColumns: ["id"];
					},
					{
						foreignKeyName: "order_items_order_id_fkey";
						columns: ["order_id"];
						isOneToOne: false;
						referencedRelation: "orders";
						referencedColumns: ["id"];
					},
				];
			};
			orders: {
				Row: {
					created_at: string | null;
					currency: string;
					customer_email: string | null;
					customer_name: string;
					customer_whatsapp: string | null;
					discount_amount: number;
					discount_type: string | null;
					id: string;
					notes: string | null;
					order_number: string;
					payment_method: string | null;
					payment_status: string;
					promo_code_id: string | null;
					shipping_address: string | null;
					shipping_country: string | null;
					status: string;
					subtotal: number;
					tracking_number: string | null;
					updated_at: string | null;
				};
				Insert: {
					created_at?: string | null;
					currency?: string;
					customer_email?: string | null;
					customer_name: string;
					customer_whatsapp?: string | null;
					discount_amount?: number;
					discount_type?: string | null;
					id?: string;
					notes?: string | null;
					order_number?: string;
					payment_method?: string | null;
					payment_status?: string;
					promo_code_id?: string | null;
					shipping_address?: string | null;
					shipping_country?: string | null;
					status?: string;
					subtotal: number;
					tracking_number?: string | null;
					updated_at?: string | null;
				};
				Update: {
					created_at?: string | null;
					currency?: string;
					customer_email?: string | null;
					customer_name?: string;
					customer_whatsapp?: string | null;
					discount_amount?: number;
					discount_type?: string | null;
					id?: string;
					notes?: string | null;
					order_number?: string;
					payment_method?: string | null;
					payment_status?: string;
					promo_code_id?: string | null;
					shipping_address?: string | null;
					shipping_country?: string | null;
					status?: string;
					subtotal?: number;
					tracking_number?: string | null;
					updated_at?: string | null;
				};
				Relationships: [
					{
						foreignKeyName: "orders_promo_code_id_fkey";
						columns: ["promo_code_id"];
						isOneToOne: false;
						referencedRelation: "promo_codes";
						referencedColumns: ["id"];
					},
				];
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
	keyof Database,
	"public"
>];

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R;
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R;
			}
			? R
			: never
		: never;

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I;
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I;
			}
			? I
			: never
		: never;

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U;
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U;
			}
			? U
			: never
		: never;

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never;

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals;
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals;
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never;

export const Constants = {
	public: {
		Enums: {},
	},
} as const;
