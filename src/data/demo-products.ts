export interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  carat: number;
}

export const demoProducts: Product[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Muzo",
    price: 2500,
    carat: 1.5,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Chivor",
    price: 3200,
    carat: 2.1,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Coscuez",
    price: 1800,
    carat: 1.2,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop",
    name: "Esmeralda Gachalá",
    price: 4500,
    carat: 3.0,
  },
];
