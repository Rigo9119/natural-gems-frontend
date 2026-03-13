import { Footer as SharedFooter } from "@natura-gems/ui";
import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import {
	COMPANY_LOCATION,
	COMPANY_NAME,
	INSTAGRAM_URL,
	WHATSAPP_URL,
} from "@/lib/constants";

export default function Footer() {
	return (
		<SharedFooter
			companyName={COMPANY_NAME}
			tagline="Esmeraldas colombianas de la más alta calidad, directamente desde las minas de Muzo a tus manos."
			location={COMPANY_LOCATION}
			exploreLinks={[
				{ label: "Colección", href: "#collections" },
				{ label: "Quiénes Somos", href: "#who-we-are" },
				{ label: "Contacto", href: "#contact" },
			]}
			socialLinks={[
				{
					icon: <SiWhatsapp className="w-4 h-4" aria-hidden="true" />,
					label: "WhatsApp",
					href: WHATSAPP_URL,
				},
				{
					icon: <SiInstagram className="w-4 h-4" aria-hidden="true" />,
					label: "Instagram",
					href: INSTAGRAM_URL,
				},
			]}
		/>
	);
}
