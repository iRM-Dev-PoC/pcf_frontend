import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InfoPopover from "@/components/v2/InfoPopover";
// import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
// type HomepageCardProps = {
//     title: string;
//     desc: string;
//     riskScore: number;
// };



const HomepageCard = () => {
    return (
        <Card className="mb-3 flex w-[32rem] flex-col  rounded-xl shadow-lg">
            <CardHeader className=" p-4 hover:bg-slate-400/20">
                <button onClick={() => console.log("Clicked")}>
                    <CardTitle className="flex justify-between">
                        <div className="flex items-center gap-x-2 text-lg font-semibold">
                            <Badge variant="destructive">High</Badge>
                            <div>Test Title</div>
                        </div>
                        <div>
                            <InfoPopover desc="test">
                                <Info className=" text-sky-600 hover:text-sky-900" />
                            </InfoPopover>
                        </div>
                    </CardTitle>
                </button>
            </CardHeader>
            <CardContent className="pt-2 text-green-600">
                test desc Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Suscipit, rem. test desc Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Suscipit, rem. consectetur
            </CardContent>
        </Card>
    );
};

export default HomepageCard;
