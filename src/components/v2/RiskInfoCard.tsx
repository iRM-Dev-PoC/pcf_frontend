import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ReactNode } from "react";

type RiskInfoCardProps = {
    children: ReactNode;
    desc: string;
};

const RiskInfoCard = ({ children, desc }: RiskInfoCardProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger>{children}</HoverCardTrigger>
            <HoverCardContent className="w-80 text-base font-medium">
                {desc}
            </HoverCardContent>
        </HoverCard>
    );
};

export default RiskInfoCard;
