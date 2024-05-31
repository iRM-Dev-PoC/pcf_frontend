import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RiskInfoCard from "@/components/v2/RiskInfoCard";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { calcRisk, cn } from "@/lib/utils";
import { Check, Info, TriangleAlert, X } from "lucide-react";

type RiskCardProps = {
    title: string;
    desc: string;
    riskScore: number;
    onClick: () => void;
};

const RiskCard = ({ title, riskScore, desc, onClick }: RiskCardProps) => {
    const { currentTheme } = useCurrentTheme();
    const isDark = Boolean(currentTheme === "dark");
    return (
        <Card
            className={cn(
                "mb-3 flex  cursor-pointer flex-col rounded-xl shadow-lg ",
                isDark && "bg-transparent text-white"
            )}
            onClick={onClick}
        >
            <CardHeader className="p-4">
                <CardTitle className="flex justify-between">
                    <div className="flex items-center gap-x-2 text-lg font-medium">
                        <Badge
                            variant={
                                calcRisk(riskScore) === "High"
                                    ? "High"
                                    : calcRisk(riskScore) === "Medium"
                                      ? "Mid"
                                      : "Low"
                            }
                        >
                            <div className="mr-1">
                                {calcRisk(riskScore) === "High" ? (
                                    <X className="size-6 text-white dark:text-black" />
                                ) : calcRisk(riskScore) === "Medium" ? (
                                    <TriangleAlert className="size-6 text-white dark:text-black" />
                                ) : (
                                    <Check className="size-6 text-white dark:text-black" />
                                )}
                            </div>
                            <span className="mr-1 text-base">
                                {calcRisk(riskScore)}:
                            </span>
                            <div className="text-base">
                                {(riskScore * 100) / 100}%
                            </div>
                        </Badge>
                    </div>

                    <div>
                        <span className="sr-only">
                            Information about this card
                        </span>
                        <RiskInfoCard desc={desc}>
                            <Info className="text-sky-600 hover:text-sky-900" />
                        </RiskInfoCard>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="m-2 text-lg font-semibold">
                {title}
            </CardContent>
        </Card>
    );
};

export default RiskCard;
