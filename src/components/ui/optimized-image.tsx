import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity";
import type { SanityImage } from "@/lib/sanity-queries";

type ImgProps = Omit<React.ComponentProps<"img">, "src">;

interface OptimizedImageProps extends ImgProps {
	src: string | SanityImage;
	alt: string;
	width?: number;
	height?: number;
	priority?: boolean;
	quality?: number;
}

function isSanityImage(src: string | SanityImage): src is SanityImage {
	return typeof src === "object" && src !== null && src._type === "image";
}

function resolveUrl(
	src: string | SanityImage,
	width?: number,
	height?: number,
	quality = 80,
): string {
	if (!isSanityImage(src)) {
		return src;
	}

	let builder = urlFor(src).auto("format").quality(quality).fit("crop");

	if (width) {
		builder = builder.width(width);
	}
	if (height) {
		builder = builder.height(height);
	}

	return builder.url();
}

function OptimizedImage({
	src,
	alt,
	width,
	height,
	priority = false,
	quality = 80,
	className,
	...props
}: OptimizedImageProps) {
	const resolvedUrl = resolveUrl(src, width, height, quality);

	return (
		<img
			data-slot="optimized-image"
			src={resolvedUrl}
			alt={alt}
			width={width}
			height={height}
			loading={priority ? undefined : "lazy"}
			decoding="async"
			fetchPriority={priority ? "high" : undefined}
			className={cn(className)}
			{...props}
		/>
	);
}

export { OptimizedImage, type OptimizedImageProps };
