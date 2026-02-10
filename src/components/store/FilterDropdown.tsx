import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface FilterDropdownProps {
	label: string;
	activeCount?: number;
	children: ReactNode;
}

export function FilterDropdown({
	label,
	activeCount = 0,
	children,
}: FilterDropdownProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className="h-10 gap-1.5 rounded-full border-brand-primary-dark/20 bg-white px-4 hover:bg-brand-primary-lighter"
				>
					<span className="text-sm font-medium text-brand-primary-dark">
						{label}
					</span>
					{activeCount > 0 && (
						<Badge
							variant="default"
							className="ml-1 h-5 min-w-5 bg-brand-primary px-1.5"
						>
							{activeCount}
						</Badge>
					)}
					<ChevronDown className="h-4 w-4 text-brand-primary-dark/60" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-64 p-4">
				{children}
			</PopoverContent>
		</Popover>
	);
}
