import { Header as SharedHeader } from "../../../../packages/ui/src";
import type { NavItem } from "../../../../packages/ui/src";
import { useState } from "react";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { CartDrawer } from "@/components/store/CartDrawer";
import { COMPANY_NAME } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";

export type { NavItem };

export interface HeaderProps {
  navItems: NavItem[];
  subNavItems?: NavItem[];
}

export default function Header({ navItems, subNavItems }: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems);

  return (
    <>
      <SharedHeader
        navItems={navItems}
        subNavItems={subNavItems}
        companyName={COMPANY_NAME}
        localeSwitcherSlot={<LocaleSwitcher />}
        cartCount={totalItems}
        onCartOpen={() => setIsCartOpen(true)}
      />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
