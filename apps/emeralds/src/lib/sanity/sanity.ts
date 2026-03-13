import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
	projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
	dataset: import.meta.env.VITE_SANITY_DATASET,
	apiVersion: "2024-01-01",
	useCdn: false,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}
