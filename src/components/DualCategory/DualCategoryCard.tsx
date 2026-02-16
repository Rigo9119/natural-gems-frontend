import { Link } from "@tanstack/react-router";
import { OptimizedImage } from "../ui/optimized-image";
import { ArrowRight } from "lucide-react";
import type { SanityImage } from "@/lib/sanity/sanity-queries";

export interface DualCategoryCardProps {
  title: string;
  description: string;
  imageSrc: string | SanityImage;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  linkTo: string;
  linkText: string;
  subtitle: string;
}

export default function DualCategoryCard({
  title,
  description,
  imageSrc,
  imageAlt,
  imageWidth = 800,
  imageHeight = 1000,
  linkTo,
  linkText,
  subtitle,
}: DualCategoryCardProps) {
  return (
    <Link
      to={linkTo}
      className="group relative aspect-3/4 overflow-hidden rounded-2xl md:aspect-4/3"
    >
      <OptimizedImage
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
        <p className="mb-2 font-body text-xs tracking-[0.2em] uppercase text-brand-secondary-golden">
          {subtitle}
        </p>
        <h3 className="mb-2 font-heading text-3xl text-white sm:text-4xl">
          {title}
        </h3>
        <p className="mb-4 max-w-xs text-sm text-white/70">{description}</p>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-brand-secondary-golden">
          {linkText}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
