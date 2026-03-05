import { useEffect, useRef, useState } from "react"
import { OptimizedImage } from "@/components/ui/optimized-image"

const mineImages = [
	{
		src: "https://images.unsplash.com/photo-1624555130581-1d9cca783bc0?w=1400&h=700&fit=crop",
		alt: "Interior de una mina de esmeraldas en Colombia",
		caption: "Las minas de Muzo, corazón esmeraldera de Colombia",
	},
	{
		src: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1400&h=700&fit=crop",
		alt: "Esmeraldas en bruto recién extraídas",
		caption: "Piedras en bruto, pureza directa de la tierra",
	},
	{
		src: "https://images.unsplash.com/photo-1601134467661-3d775b999c18?w=1400&h=700&fit=crop",
		alt: "Proceso de selección de esmeraldas",
		caption: "Selección artesanal piedra por piedra",
	},
	{
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=700&fit=crop",
		alt: "Montañas de la región esmeraldera de Colombia",
		caption: "La cordillera colombiana, cuna de las mejores esmeraldas del mundo",
	},
	{
		src: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=1400&h=700&fit=crop",
		alt: "Gemas de esmeralda con su característico verde intenso",
		caption: "El verde más puro, sello de las esmeraldas de Muzo",
	},
]

const SLIDE_INTERVAL_MS = 4500

export default function MineCarousel() {
	const [current, setCurrent] = useState(0)
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

	const startInterval = () => {
		intervalRef.current = setInterval(() => {
			setCurrent((prev) => (prev + 1) % mineImages.length)
		}, SLIDE_INTERVAL_MS)
	}

	useEffect(() => {
		startInterval()
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current)
		}
	}, [])

	return (
		<section aria-label="Galería de minas de esmeraldas colombianas">
			<div className="relative overflow-hidden h-[360px] sm:h-[480px] lg:h-[560px] bg-brand-primary-dark">
				{mineImages.map((img, index) => (
					<div
						key={img.src}
						className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
						style={{ opacity: index === current ? 1 : 0 }}
						aria-hidden={index !== current}
					>
						<OptimizedImage
							src={img.src}
							alt={img.alt}
							width={1400}
							height={700}
							className="w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-brand-primary-dark/70 via-brand-primary-dark/10 to-transparent" />
					</div>
				))}

				{/* Caption */}
				<div className="absolute bottom-0 left-0 right-0 px-6 sm:px-12 pb-8 sm:pb-10">
					<p className="font-body text-brand-primary-lighter/90 text-sm sm:text-base text-center tracking-wide transition-opacity duration-500">
						{mineImages[current].caption}
					</p>
				</div>

				{/* Dot indicators */}
				<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
					{mineImages.map((_, index) => (
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
