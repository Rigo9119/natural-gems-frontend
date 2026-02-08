import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "@/data/demo-products";

const MAX_COMPARE_ITEMS = 4;

interface CompareContextType {
	compareItems: Product[];
	addToCompare: (product: Product) => void;
	removeFromCompare: (productId: number) => void;
	clearCompare: () => void;
	isInCompare: (productId: number) => boolean;
	canAddMore: boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
	const [compareItems, setCompareItems] = useState<Product[]>([]);

	const addToCompare = (product: Product) => {
		setCompareItems((prev) => {
			if (prev.length >= MAX_COMPARE_ITEMS) return prev;
			if (prev.some((p) => p.id === product.id)) return prev;
			return [...prev, product];
		});
	};

	const removeFromCompare = (productId: number) => {
		setCompareItems((prev) => prev.filter((p) => p.id !== productId));
	};

	const clearCompare = () => {
		setCompareItems([]);
	};

	const isInCompare = (productId: number) => {
		return compareItems.some((p) => p.id === productId);
	};

	const canAddMore = compareItems.length < MAX_COMPARE_ITEMS;

	return (
		<CompareContext.Provider
			value={{
				compareItems,
				addToCompare,
				removeFromCompare,
				clearCompare,
				isInCompare,
				canAddMore,
			}}
		>
			{children}
		</CompareContext.Provider>
	);
}

export function useCompare() {
	const context = useContext(CompareContext);
	if (!context) {
		throw new Error("useCompare must be used within a CompareProvider");
	}
	return context;
}
