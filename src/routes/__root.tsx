import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { CompareProvider } from "@/context/CompareContext";
import { buildMeta, organizationJsonLd } from "@/lib/seo";
import { getLocale } from "@/paraglide/runtime";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    // Other redirect strategies are possible; see
    // https://github.com/TanStack/router/tree/main/examples/react/i18n-paraglide#offline-redirect
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", getLocale());
    }
  },

  head: () => {
    const seo = buildMeta({ jsonLd: [organizationJsonLd()] });
    return {
      meta: [
        { charSet: "utf-8" },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        { name: "theme-color", content: "#3B5B46" },
        ...seo.meta,
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/logo192.png" },
        { rel: "manifest", href: "/manifest.json" },
        ...seo.links,
      ],
      scripts: seo.scripts,
    };
  },

  component: RootComponent,
  shellComponent: RootDocument,
});

const appNavItems = [
  { label: "Inicio", href: "/" },
  { label: "Esmeraldas", href: "/emeralds" },
  { label: "Joyería", href: "/jewelry" },
  { label: "Nosotros", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/guides" },
  { label: "Contacto", href: "/contact" },
];

function RootComponent() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const isHomePage = pathname === "/" || pathname === "";
  const headerVariant = isHomePage ? "transparent" : "solid";

  return (
    <CompareProvider>
      <Header variant={headerVariant} navItems={appNavItems} />
      <main id="main-content" className={isHomePage ? "" : "pt-20"}>
        <Outlet />
      </main>
      <Footer />
    </CompareProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang={getLocale()}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
