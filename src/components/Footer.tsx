import {
  WHATSAPP_URL,
  INSTAGRAM_URL,
  COMPANY_NAME,
  COMPANY_LOCATION,
} from "@/lib/constants";
import { SiWhatsapp, SiInstagram } from "@icons-pack/react-simple-icons";

export default function Footer() {
  return (
    <footer className="bg-brand-primary-dark text-brand-primary-lighter">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <p className="font-heading text-3xl mb-4">{COMPANY_NAME}</p>
            <p className="text-brand-primary-lighter/70 text-sm leading-relaxed max-w-xs">
              Esmeraldas colombianas de la más alta calidad, directamente desde
              las minas de Muzo a tus manos.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Enlaces del pie de página">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-brand-secondary-golden mb-6">
              Explorar
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="#collections"
                  className="text-brand-primary-lighter/70 hover:text-brand-primary-lighter transition-colors"
                >
                  Colección
                </a>
              </li>
              <li>
                <a
                  href="#who-we-are"
                  className="text-brand-primary-lighter/70 hover:text-brand-primary-lighter transition-colors"
                >
                  Quiénes Somos
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-brand-primary-lighter/70 hover:text-brand-primary-lighter transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-brand-secondary-golden mb-6">
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-primary-lighter/70 hover:text-brand-primary-lighter transition-colors"
                >
                  <SiWhatsapp className="w-4 h-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-primary-lighter/70 hover:text-brand-primary-lighter transition-colors"
                >
                  <SiInstagram className="w-4 h-4" aria-hidden="true" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-brand-primary-lighter/20 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
          <p className="text-brand-primary-lighter/50 text-sm">
            © {new Date().getFullYear()} {COMPANY_NAME}. Todos los derechos
            reservados.
          </p>
          <p className="text-brand-primary-lighter/50 text-sm">
            Hecho por{" "}
            <a
              href="https://blyts.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-secondary-golden hover:text-brand-primary-lighter transition-colors"
            >
              Blyts SAS
            </a>
          </p>
          <p className="text-brand-primary-lighter/50 text-sm">
            {COMPANY_LOCATION}
          </p>
        </div>
      </div>
    </footer>
  );
}
