import { useEffect, useRef, useState } from "react"

export interface CarouselSlide {
	src: string
	alt: string
	caption?: string
}

interface MineCarouselProps {
	slides: CarouselSlide[]
	intervalMs?: number
}

const SLIDE_INTERVAL_MS = 4500

export function MineCarousel({ slides, intervalMs = SLIDE_INTERVAL_MS }: MineCarouselProps) {
	const [current, setCurrent] = useState(0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const startInterval = () => {
		intervalRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % slides.length)
		}, intervalMs)
	}

	useEffect(() => {
		startInterval()
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [])

	if (slides.length === 0) return null

	return (
		<section aria-label="Galería de imágenes">
			<div className="relative overflow-hidden h-[360px] sm:h-[480px] lg:h-[560px] bg-brand-primary-dark">
				{slides.map((slide, index) => (
					<div
						key={slide.src}
						className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
						style={{ opacity: index === current ? 1 : 0 }}
						aria-hidden={index !== current}
					>
						<img
							src={slide.src}
							alt={slide.alt}
							width={1400}
							height={700}
							loading={index === 0 ? undefined : "lazy"}
							decoding="async"
							fetchPriority={index === 0 ? "high" : undefined}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/70 via-brand-primary-dark/10 to-transparent" />
					</div>
				))}

				{/* Caption */}
				{slides[current].caption && (
					<div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-8 sm:pb-10">
						<p className="font-body text-brand-primary-lighter/90 text-sm sm:text-base text-center tracking-wide transition-opacity duration-500">
							{slides[current].caption}
						</p>
					</div>
				)}

				{/* Dot indicators */}
				<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
					{slides.map((_, index) => (
						<button
							key={index}
							type="button"
							aria-label={`Imagen ${index + 1}`}
							onClick={() => {
								setCurrent(index)
								if (intervalRef.current) clearInterval(intervalRef.current)
								startInterval()
							}}
							className={`h-1.5 rounded-full transition-all duration-300 ${
								index === current
									? "w-6 bg-brand-secondary-golden"
									: "w-1.5 bg-brand-primary-lighter/50"
							}`}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
