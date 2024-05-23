import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RiskInfoCard from "@/components/v2/RiskInfoCard";
import { calcRisk } from "@/lib/utils";

import { Info } from "lucide-react";

type RiskCardProps = {
    title: string;
    desc: string;
    riskScore: number;
    info?: string;
    onClick: () => void;
};

const RiskCard = ({ title, desc, riskScore, info, onClick }: RiskCardProps) => {
    return (
        <Card
            className="mb-3 flex cursor-pointer  flex-col rounded-xl shadow-lg"
            onClick={onClick}
        >
            <CardHeader className="p-4 hover:bg-slate-400/20">
                <CardTitle className="flex justify-between">
                    <div className="flex items-center gap-x-2 text-lg font-semibold">
                        <Badge variant="high">{calcRisk(riskScore)}</Badge>
                        <div>{title}</div>
                    </div>
                    {info && (
                        <div>
                            <span className="sr-only">
                                Info about this card
                            </span>
                            <RiskInfoCard desc={info}>
                                <Info className="text-sky-600 hover:text-sky-900" />
                            </RiskInfoCard>
                        </div>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">{desc}</CardContent>
        </Card>
    );
};

export default RiskCard;
