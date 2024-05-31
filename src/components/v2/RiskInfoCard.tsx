import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type RiskInfoCardProps = {
    children: ReactNode;
    desc: string;
};

const RiskInfoCard = ({ children, desc }: RiskInfoCardProps) => {
    const { currentTheme } = useCurrentTheme();
    const isDark = Boolean(currentTheme === "dark");
    return (
        <HoverCard>
            <HoverCardTrigger>{children}</HoverCardTrigger>
            <HoverCardContent
                className={cn(
                    "w-80 text-base font-medium",
                    isDark && "bg-[#1d232a] text-white"
                )}
            >
                {desc}
            </HoverCardContent>
        </HoverCard>
    );
};

export default RiskInfoCard;
