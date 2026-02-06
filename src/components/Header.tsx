import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export interface HeaderProps {
  navItems: string[];
}

export default function Header({ navItems }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 p-4 flex flex-col items-center transition-all duration-300 ${
          isScrolled
            ? "bg-brand-primary-dark/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <h1 className="ml-4 text-xl font-semibold py-4">
          <Link to="/">Home</Link>
        </h1>
        <nav className="w-full px-16 py-4">
          <ul className="flex flex-row w-full items-center justify-between">
            {navItems?.map((item, index) => (
              <li
                key={index}
                className={`w-${100 / navItems.length}% text-brand-primary-lighter`}
              >
                <Link to={item}>{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
