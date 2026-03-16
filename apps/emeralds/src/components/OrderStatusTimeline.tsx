import { CheckCircle, Circle, XCircle } from "lucide-react"

type Props = { status: string }

type Step = {
	key: string
	label: string
}

const STEPS: Step[] = [
	{ key: "confirmed", label: "Confirmado" },
	{ key: "in_progress", label: "Preparando envío" },
	{ key: "shipped", label: "Enviado" },
	{ key: "delivered", label: "Entregado" },
]

const STATUS_ORDER: Record<string, number> = {
	pending: -1,
	confirmed: 0,
	in_progress: 1,
	shipped: 2,
	delivered: 3,
}

export function OrderStatusTimeline({ status }: Props) {
	if (status === "cancelled") {
		return (
			<div className="flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3">
				<XCircle className="h-5 w-5 text-red-500 shrink-0" />
				<p className="text-sm font-medium text-red-700">Pedido cancelado</p>
			</div>
		)
	}

	const currentIndex = STATUS_ORDER[status] ?? 0

	return (
		<div className="w-full">
			<ol className="flex items-start justify-between gap-1">
				{STEPS.map((step, idx) => {
					const isCompleted = idx < currentIndex
					const isCurrent = idx === currentIndex
					const isFuture = idx > currentIndex

					return (
						<li key={step.key} className="flex flex-1 flex-col items-center gap-1.5">
							{/* connector + icon row */}
							<div className="relative flex w-full items-center">
								{/* left connector */}
								<div
									className={`h-0.5 flex-1 ${idx === 0 ? "invisible" : isCompleted || isCurrent ? "bg-brand-primary-dark" : "bg-brand-primary-dark/15"}`}
								/>
								{/* icon */}
								<span
									className={`z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${
										isCompleted
											? "border-brand-primary-dark bg-brand-primary-dark"
											: isCurrent
												? "border-brand-primary-dark bg-white ring-2 ring-brand-primary-dark/20"
												: "border-brand-primary-dark/20 bg-white"
									}`}
								>
									{isCompleted ? (
										<CheckCircle className="h-4 w-4 text-white" />
									) : isCurrent ? (
										<Circle className="h-3 w-3 fill-brand-primary-dark text-brand-primary-dark" />
									) : (
										<Circle className="h-3 w-3 text-brand-primary-dark/20" />
									)}
								</span>
								{/* right connector */}
								<div
									className={`h-0.5 flex-1 ${idx === STEPS.length - 1 ? "invisible" : isCompleted ? "bg-brand-primary-dark" : "bg-brand-primary-dark/15"}`}
								/>
							</div>
							{/* label */}
							<span
								className={`text-center text-[10px] leading-tight ${
									isFuture
										? "text-brand-primary-dark/30"
										: isCurrent
											? "font-semibold text-brand-primary-dark"
											: "text-brand-primary-dark/60"
								}`}
							>
								{step.label}
							</span>
						</li>
					)
				})}
			</ol>
		</div>
	)
}
