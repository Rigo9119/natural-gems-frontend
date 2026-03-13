import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  /** Omit for the current (last) item */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadCrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`border-b border-brand-primary-dark/10 bg-white ${className ?? ""}`}
    >
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-xs text-brand-primary-dark/60 md:px-6 lg:px-8">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.label}
              className="flex items-center gap-1.5"
              {...(isLast ? { "aria-current": "page" as const } : {})}
            >
              {index > 0 && (
                <ChevronRight className="h-3 w-3 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span
                  className={
                    isLast
                      ? "truncate font-medium text-brand-primary-dark"
                      : undefined
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="transition-colors hover:text-brand-primary-dark"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
