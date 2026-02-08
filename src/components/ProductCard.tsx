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
      <figure className="aspect-square overflow-hidden rounded-lg bg-brand-primary-lighter">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </figure>
      <dl className="mt-4 space-y-1">
        <dt className="sr-only">Nombre</dt>
        <dd className="font-heading text-xl text-brand-primary-dark">{name}</dd>
        <dt className="sr-only">Quilates</dt>
        <dd className="text-sm text-brand-primary-dark/70">{carat} quilates</dd>
        <dt className="sr-only">Precio</dt>
        <dd className="font-body font-semibold text-brand-primary-dark">
          <data value={price}>${price.toLocaleString()}</data>
        </dd>
      </dl>
    </article>
  );
}
