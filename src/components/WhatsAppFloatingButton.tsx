import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface WhatsAppFloatingButtonProps {
	/**
	 * Optional callback to open a third-party chatbot SDK (e.g. WATI, Respond.io).
	 * When provided, clicking the button fires this handler instead of navigating
	 * to wa.me — making it easy to swap in a real chatbot without changing the UI.
	 */
	onOpen?: () => void;
}

const GREETING = encodeURIComponent(
	"Hola, me gustaría obtener más información sobre sus esmeraldas.",
);
const WA_CHAT_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${GREETING}`;

export default function WhatsAppFloatingButton({
	onOpen,
}: WhatsAppFloatingButtonProps) {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (onOpen) {
			e.preventDefault();
			onOpen();
		}
	};

	return (
		<a
			href={WA_CHAT_URL}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Chatea con nosotros por WhatsApp"
			onClick={handleClick}
			className="group fixed bottom-6 right-6 z-50 flex items-center justify-center"
		>
			{/* Pulse ring */}
			<span
				aria-hidden="true"
				className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-50 duration-1000"
			/>

			{/* Button circle */}
			<span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 group-hover:scale-110">
				<SiWhatsapp className="h-7 w-7 text-white" aria-hidden="true" />
			</span>

			{/* Tooltip */}
			<span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-gray-800 opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
				Chatea con nosotros
				{/* Tooltip arrow */}
				<span
					aria-hidden="true"
					className="absolute right-[-6px] top-1/2 -translate-y-1/2 border-4 border-transparent border-l-white"
				/>
			</span>
		</a>
	);
}
