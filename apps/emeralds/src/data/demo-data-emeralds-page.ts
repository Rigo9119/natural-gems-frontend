import type { Clarity } from "@/lib/supabase-queries";

export const miningRegions = [
  {
    name: "Muzo",
    region: "Boyaca occidental",
    colorProfile: "Verde intenso calido con tonos azulados",
    knownFor:
      "Las esmeraldas mas valoradas del mundo. Color profundo, alta saturacion y el caracteristico verde Muzo reconocido internacionalmente por GIA.",
    priceNote: "Prima de precio de hasta 30-50% sobre otras regiones",
  },
  {
    name: "Chivor",
    region: "Boyaca oriental",
    colorProfile: "Verde azulado frio y cristalino",
    knownFor:
      "Transparencia excepcional y tonos azul-verde frios. Hogar de la Esmeralda Patricia (632 ct) expuesta en el Museo Americano de Historia Natural.",
    priceNote: "Alta demanda en el mercado asiatico y de coleccionistas",
  },
  {
    name: "Coscuez",
    region: "Boyaca norte",
    colorProfile: "Verde medio con tonos amarillentos",
    knownFor:
      "Gran volumen de produccion. Piedras con buena saturacion, frecuentemente utilizadas en joyeria de alta gama por su excelente relacion calidad-precio.",
    priceNote: "Excelente valor para joyeria comercial y diseno",
  },
  {
    name: "Gachala",
    region: "Cundinamarca",
    colorProfile: "Verde puro intenso, raramente azulado",
    knownFor:
      "Origen de la Esmeralda Gachala (858 ct), una de las mayores del mundo. Produccion limitada que confiere exclusividad a cada pieza certificada.",
    priceNote: "Prima por rareza y proveniencia documentada",
  },
];

export const clarityGrades: {
  grade: Clarity;
  title: string;
  description: string;
  image: string;
}[] = [
  {
    grade: "AAA",
    title: "Premium",
    description:
      "Las esmeraldas de mayor pureza y brillo, seleccionadas por su excepcional transparencia y color intenso",
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=1000&fit=crop",
  },
  {
    grade: "AA",
    title: "Selecta",
    description:
      "Piedras de alta calidad con excelente saturación de color y mínimas inclusiones visibles",
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=600&fit=crop",
  },
  {
    grade: "A",
    title: "Clásica",
    description:
      "Esmeraldas con buen color y claridad, ideales para joyería elegante del día a día",
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=600&fit=crop",
  },
  {
    grade: "B",
    title: "Natural",
    description:
      "Piedras con carácter natural, perfectas para diseños artesanales y piezas únicas",
    image:
      "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800&h=1000&fit=crop",
  },
];
