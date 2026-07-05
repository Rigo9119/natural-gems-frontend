interface FieldErrorProps {
	errors: unknown[];
}

function extractMessage(error: unknown): string | null {
	if (!error) return null;
	if (typeof error === "string") return error;
	if (Array.isArray(error) && error.length > 0) {
		const first = error[0];
		if (typeof first === "string") return first;
		if (first && typeof (first as { message?: unknown }).message === "string") {
			return (first as { message: string }).message;
		}
	}
	if (typeof (error as { message?: unknown }).message === "string") {
		return (error as { message: string }).message;
	}
	return null;
}

export function FieldError({ errors }: FieldErrorProps) {
	const message = errors.map(extractMessage).find(Boolean);
	if (!message) return null;
	return <p className="text-xs text-red-600">{message}</p>;
}
