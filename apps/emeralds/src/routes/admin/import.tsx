import { createFileRoute, Link } from "@tanstack/react-router"
import { Download, FileSpreadsheet, Upload } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import {
	type ImportResult,
	type ParseResult,
	type ValidImportRow,
	batchInsertEmeralds,
	downloadTemplate,
	parseSpreadsheetFile,
} from "@/lib/import-emeralds"

export const Route = createFileRoute("/admin/import")({
	component: ImportPage,
})

// ── Types ─────────────────────────────────────────────────────────────────────

type WizardState =
	| { step: "upload" }
	| { step: "review"; parseResult: ParseResult }
	| {
			step: "importing"
			validRows: ValidImportRow[]
	  }
	| { step: "done"; result: ImportResult }

// ── Step indicator ────────────────────────────────────────────────────────────

const STEPS = [
	{ label: "Subir archivo" },
	{ label: "Revisar datos" },
	{ label: "Importando" },
	{ label: "Resultado" },
]

function stepIndex(state: WizardState): number {
	if (state.step === "upload") return 0
	if (state.step === "review") return 1
	if (state.step === "importing") return 2
	return 3
}

function WizardStepIndicator({ state }: { state: WizardState }) {
	const active = stepIndex(state)
	return (
		<div className="flex items-center gap-0">
			{STEPS.map((s, i) => (
				<div key={s.label} className="flex items-center">
					<div className="flex flex-col items-center">
						<span
							className={`flex h-7 w-7 items-center justify-center rounded-full font-body text-xs font-semibold transition-colors ${
								i === active
									? "bg-brand-secondary-golden text-brand-primary-dark"
									: i < active
										? "bg-brand-primary-dark text-brand-primary-lighter"
										: "bg-gray-100 text-gray-400"
							}`}
						>
							{i < active ? "✓" : i + 1}
						</span>
						<span
							className={`mt-1 font-body text-xs ${
								i === active
									? "font-semibold text-brand-primary-dark"
									: "text-gray-400"
							}`}
						>
							{s.label}
						</span>
					</div>
					{i < STEPS.length - 1 && (
						<div
							className={`mx-2 mb-5 h-px w-12 transition-colors ${
								i < active ? "bg-brand-primary-dark" : "bg-gray-200"
							}`}
						/>
					)}
				</div>
			))}
		</div>
	)
}

// ── Upload step ───────────────────────────────────────────────────────────────

function UploadStep({
	onParsed,
}: {
	onParsed: (result: ParseResult) => void
}) {
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [parseError, setParseError] = useState<string | null>(null)
	const [isParsing, setIsParsing] = useState(false)

	const handleFile = async (file: File) => {
		setParseError(null)
		if (file.size > 5 * 1024 * 1024) {
			setParseError("El archivo no puede superar los 5 MB.")
			return
		}
		const ext = file.name.split(".").pop()?.toLowerCase()
		if (!ext || !["xlsx", "xls", "csv"].includes(ext)) {
			setParseError("Formato no válido. Usa .xlsx, .xls o .csv.")
			return
		}
		setIsParsing(true)
		try {
			const result = await parseSpreadsheetFile(file)
			onParsed(result)
		} catch {
			setParseError("Error al leer el archivo. Verifica que no esté dañado.")
		} finally {
			setIsParsing(false)
		}
	}

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
		const file = e.dataTransfer.files[0]
		if (file) handleFile(file)
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) handleFile(file)
	}

	return (
		<div className="space-y-6">
			{/* Drop zone */}
			<div
				onDragOver={(e) => {
					e.preventDefault()
					setIsDragging(true)
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}
				className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-16 text-center transition-colors ${
					isDragging
						? "border-brand-primary-dark bg-brand-primary-lighter/20"
						: "border-gray-200 bg-white hover:border-brand-primary-dark/30"
				}`}
			>
				<span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-dark/5">
					<FileSpreadsheet className="h-6 w-6 text-brand-primary-dark/40" />
				</span>
				<p className="font-body text-base font-medium text-brand-primary-dark">
					Arrastra tu archivo aquí
				</p>
				<p className="mt-1 font-body text-sm text-gray-400">
					.xlsx, .xls o .csv · máx. 5 MB
				</p>
				<div className="mt-6 flex items-center gap-3">
					<input
						ref={fileInputRef}
						type="file"
						accept=".xlsx,.xls,.csv"
						className="hidden"
						onChange={handleInputChange}
					/>
					<Button
						type="button"
						disabled={isParsing}
						onClick={() => fileInputRef.current?.click()}
						className="bg-brand-primary-dark font-body text-sm text-brand-primary-lighter hover:bg-brand-primary-dark/90"
					>
						<Upload className="mr-2 h-4 w-4" />
						{isParsing ? "Procesando..." : "Subir archivo"}
					</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={downloadTemplate}
						className="font-body text-sm text-gray-500 hover:text-brand-primary-dark"
					>
						<Download className="mr-2 h-4 w-4" />
						Descargar plantilla Excel
					</Button>
				</div>
			</div>

			{parseError && (
				<div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 font-body text-sm text-red-700">
					{parseError}
				</div>
			)}

			<p className="font-body text-center text-xs text-gray-400">
				También puedes exportar desde Google Sheets como .xlsx o .csv
			</p>
		</div>
	)
}

// ── Review step ───────────────────────────────────────────────────────────────

function ReviewStep({
	parseResult,
	onBack,
	onImport,
}: {
	parseResult: ParseResult
	onBack: () => void
	onImport: (rows: ValidImportRow[]) => void
}) {
	const [showOnlyErrors, setShowOnlyErrors] = useState(false)

	const { validRows, errorRows, totalRows } = parseResult
	const errorCount = errorRows.length

	// Build display rows from both valid and error rows
	const allDisplayRows = [
		...validRows.map((r, i) => ({ type: "valid" as const, rowIndex: i + 2, data: r, errors: [] })),
		...errorRows.map((r) => ({ type: "error" as const, rowIndex: r.rowIndex, data: r.data as any, errors: r.errors })),
	].sort((a, b) => a.rowIndex - b.rowIndex)

	const displayRows = showOnlyErrors
		? allDisplayRows.filter((r) => r.type === "error")
		: allDisplayRows

	return (
		<div className="space-y-5">
			{/* Summary strip */}
			<div className="flex flex-wrap gap-4">
				{[
					{ label: "Total filas", value: totalRows, color: "text-brand-primary-dark" },
					{ label: "Válidas", value: validRows.length, color: "text-green-600" },
					{ label: "Con errores", value: errorCount, color: errorCount > 0 ? "text-red-600" : "text-gray-400" },
				].map((s) => (
					<div
						key={s.label}
						className="rounded-lg border border-gray-200 bg-white px-5 py-3 shadow-sm"
					>
						<p className="font-body text-xs text-gray-400">{s.label}</p>
						<p className={`font-heading text-xl ${s.color}`}>{s.value}</p>
					</div>
				))}
			</div>

			{errorCount > 0 && (
				<div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
					<p className="font-body text-sm text-amber-700">
						{errorCount} {errorCount === 1 ? "fila tiene errores" : "filas tienen errores"} y{" "}
						{errorCount === 1 ? "será omitida" : "serán omitidas"} en la importación.
					</p>
				</div>
			)}

			{/* Toggle */}
			<div className="flex gap-2">
				<Button
					type="button"
					variant={!showOnlyErrors ? "outline" : "ghost"}
					size="sm"
					onClick={() => setShowOnlyErrors(false)}
					className="font-body text-sm"
				>
					Mostrar todas
				</Button>
				<Button
					type="button"
					variant={showOnlyErrors ? "outline" : "ghost"}
					size="sm"
					onClick={() => setShowOnlyErrors(true)}
					className="font-body text-sm"
				>
					Solo con errores ({errorCount})
				</Button>
			</div>

			{/* Preview table */}
			<Card className="overflow-hidden rounded-2xl border-brand-primary-dark/10 shadow-sm">
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="bg-brand-primary-dark hover:bg-brand-primary-dark">
								{["#", "Nombre", "Quilates", "Claridad", "Corte", "Origen", "Precio", "Estado", "Errores"].map((h) => (
									<TableHead key={h} className="font-body text-xs uppercase tracking-wider text-brand-secondary-golden">
										{h}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{displayRows.map((row) => (
								<TableRow
									key={row.rowIndex}
									className={row.type === "error" ? "bg-red-50" : "bg-white hover:bg-brand-primary-lighter/20"}
								>
									<TableCell className="font-body text-xs text-gray-400">{row.rowIndex}</TableCell>
									<TableCell className="font-body text-sm font-medium text-brand-primary-dark">
										{row.type === "valid" ? (row.data as ValidImportRow).name : (row.data as any).nombre ?? (row.data as any).name ?? "—"}
									</TableCell>
									<TableCell className="font-body text-sm text-gray-600">
										{row.type === "valid" ? (row.data as ValidImportRow).carats : (row.data as any).quilates ?? "—"}
									</TableCell>
									<TableCell className="font-body text-sm text-gray-600">
										{row.type === "valid" ? (row.data as ValidImportRow).clarity : (row.data as any).claridad ?? "—"}
									</TableCell>
									<TableCell className="font-body text-sm text-gray-600">
										{row.type === "valid" ? (row.data as ValidImportRow).cut : (row.data as any).corte ?? "—"}
									</TableCell>
									<TableCell className="font-body text-sm text-gray-600">
										{row.type === "valid" ? (row.data as ValidImportRow).origin : (row.data as any).origen ?? "—"}
									</TableCell>
									<TableCell className="font-body text-sm font-medium text-brand-primary-dark">
										{row.type === "valid" ? `$${(row.data as ValidImportRow).price.toLocaleString()}` : (row.data as any).precio ?? "—"}
									</TableCell>
									<TableCell className="font-body text-sm text-gray-600">
										{row.type === "valid" ? (row.data as ValidImportRow).status : (row.data as any).estado ?? "—"}
									</TableCell>
									<TableCell>
										{row.errors.length > 0 ? (
											<div className="flex flex-wrap gap-1">
												{row.errors.map((err) => (
													<Badge
														key={`${err.field}-${err.message}`}
														variant="destructive"
														className="font-body text-xs"
													>
														{err.field}: {err.message}
													</Badge>
												))}
											</div>
										) : (
											<span className="font-body text-xs text-green-600">OK</span>
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Actions */}
			<div className="flex justify-between">
				<Button
					type="button"
					variant="ghost"
					onClick={onBack}
					className="font-body text-sm text-gray-500"
				>
					Volver
				</Button>
				<Button
					type="button"
					disabled={validRows.length === 0}
					onClick={() => onImport(validRows)}
					className="bg-brand-primary-dark font-body text-sm text-brand-primary-lighter hover:bg-brand-primary-dark/90"
				>
					Importar {validRows.length} {validRows.length === 1 ? "fila válida" : "filas válidas"}
				</Button>
			</div>
		</div>
	)
}

// ── Importing step ────────────────────────────────────────────────────────────

function ImportingStep({
	validRows,
	onDone,
}: {
	validRows: ValidImportRow[]
	onDone: (result: ImportResult) => void
}) {
	const [progress, setProgress] = useState(0)
	const total = validRows.length

	useEffect(() => {
		let cancelled = false
		batchInsertEmeralds(validRows, (inserted) => {
			if (!cancelled) setProgress(inserted)
		}).then((result) => {
			if (!cancelled) onDone(result)
		})
		return () => {
			cancelled = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const pct = total > 0 ? Math.round((progress / total) * 100) : 0

	return (
		<div className="flex flex-col items-center justify-center py-16">
			<Card className="w-full max-w-md rounded-2xl border-brand-primary-dark/10 shadow-sm">
				<CardContent className="p-8 text-center space-y-5">
					<span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary-dark/5">
						<FileSpreadsheet className="h-6 w-6 text-brand-primary-dark/40" />
					</span>
					<div>
						<p className="font-heading text-lg text-brand-primary-dark">
							Importando...
						</p>
						<p className="mt-1 font-body text-sm text-gray-400">
							Insertando {progress} de {total} filas
						</p>
					</div>
					<Progress value={pct} className="h-2" />
					<p className="font-body text-xs text-gray-400">{pct}%</p>
				</CardContent>
			</Card>
		</div>
	)
}

// ── Done step ─────────────────────────────────────────────────────────────────

function DoneStep({
	result,
	onReset,
}: {
	result: ImportResult
	onReset: () => void
}) {
	const [showErrors, setShowErrors] = useState(false)

	return (
		<div className="flex flex-col items-center py-8">
			<Card className="w-full max-w-lg rounded-2xl border-brand-primary-dark/10 shadow-sm">
				<CardContent className="p-8 space-y-6 text-center">
					<span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
						<span className="font-heading text-3xl text-green-600">✓</span>
					</span>
					<div>
						<h3 className="font-heading text-2xl text-brand-primary-dark">
							Importación completa
						</h3>
						<p className="mt-2 font-body text-sm text-gray-500">
							Se insertaron{" "}
							<span className="font-semibold text-brand-primary-dark">
								{result.inserted}
							</span>{" "}
							esmeraldas correctamente.
						</p>
					</div>

					{result.errors.length > 0 && (
						<div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left space-y-2">
							<button
								type="button"
								onClick={() => setShowErrors((v) => !v)}
								className="font-body text-sm font-medium text-amber-700 hover:underline w-full text-left"
							>
								{showErrors ? "Ocultar" : "Ver"} {result.errors.length} filas con errores
							</button>
							{showErrors && (
								<ul className="space-y-1">
									{result.errors.map((e) => (
										<li key={e.row} className="font-body text-xs text-amber-700">
											Fila {e.row}: {e.error}
										</li>
									))}
								</ul>
							)}
						</div>
					)}

					<div className="flex flex-col gap-3">
						<Button
							type="button"
							onClick={onReset}
							variant="outline"
							className="border-brand-primary-dark/20 font-body text-sm text-brand-primary-dark"
						>
							Importar otro archivo
						</Button>
						<Button
							asChild
							className="bg-brand-primary-dark font-body text-sm text-brand-primary-lighter hover:bg-brand-primary-dark/90"
						>
							<Link to="/admin/emeralds">Ver inventario</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}

// ── Page component ────────────────────────────────────────────────────────────

function ImportPage() {
	const [wizardState, setWizardState] = useState<WizardState>({ step: "upload" })

	const handleParsed = (parseResult: ParseResult) => {
		setWizardState({ step: "review", parseResult })
	}

	const handleImport = (validRows: ValidImportRow[]) => {
		setWizardState({ step: "importing", validRows })
	}

	const handleDone = (result: ImportResult) => {
		setWizardState({ step: "done", result })
	}

	const handleReset = () => {
		setWizardState({ step: "upload" })
	}

	return (
		<div className="space-y-8">
			{/* Page title */}
			<div>
				<h2 className="font-heading text-2xl text-brand-primary-dark">
					Importar desde Excel
				</h2>
				<p className="mt-1 font-body text-sm text-gray-400">
					Sube un archivo .xlsx, .xls o .csv para importar esmeraldas en masa.
				</p>
			</div>

			{/* Step indicator */}
			<WizardStepIndicator state={wizardState} />

			{/* Step content */}
			{wizardState.step === "upload" && (
				<UploadStep onParsed={handleParsed} />
			)}

			{wizardState.step === "review" && (
				<ReviewStep
					parseResult={wizardState.parseResult}
					onBack={handleReset}
					onImport={handleImport}
				/>
			)}

			{wizardState.step === "importing" && (
				<ImportingStep
					validRows={wizardState.validRows}
					onDone={handleDone}
				/>
			)}

			{wizardState.step === "done" && (
				<DoneStep result={wizardState.result} onReset={handleReset} />
			)}
		</div>
	)
}
