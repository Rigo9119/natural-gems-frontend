export interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  carat: number;
}

export default function ProductCard({
  image,
  name,
  price,
  carat,
}: ProductCardProps) {
  return (
    <article className="group cursor-pointer">
      <div className="aspect-square overflow-hidden rounded-lg bg-brand-primary-lighter">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-heading text-xl text-brand-primary-dark">{name}</h3>
        <p className="text-sm text-brand-primary-dark/70">{carat} quilates</p>
        <p className="font-body font-semibold text-brand-primary-dark">
          ${price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
