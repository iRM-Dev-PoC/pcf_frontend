import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoPopover from "@/components/v2/InfoPopover";
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
            className="mb-3 flex w-[32rem] flex-col  rounded-xl shadow-lg"
            onClick={onClick}
        >
            <CardHeader className=" p-4 hover:bg-slate-400/20">
                <button onClick={() => console.log("Clicked")}>
                    <CardTitle className="flex justify-between">
                        <div className="flex items-center gap-x-2 text-lg font-semibold">
                            <Badge variant="destructive">
                                {calcRisk(riskScore)}
                            </Badge>
                            <div>{title}</div>
                        </div>
                        {info && (
                            <div>
                                <InfoPopover desc={info}>
                                    <Info className="text-sky-600 hover:text-sky-900" />
                                </InfoPopover>
                            </div>
                        )}
                    </CardTitle>
                </button>
            </CardHeader>
            <CardContent className="pt-2">{desc}</CardContent>
        </Card>
    );
};

export default RiskCard;
