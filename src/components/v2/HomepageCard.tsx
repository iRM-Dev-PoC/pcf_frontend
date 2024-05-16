import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
                    <CardTitle className="">
                        <div className="flex items-center gap-x-2 text-lg font-semibold">
                            <Badge variant="destructive">High</Badge>
                            <div>Test Title</div>
                        </div>
                    </CardTitle>
                </button>
            </CardHeader>
            <CardContent className=" pt-2">
                test desc Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Suscipit, rem. test desc Lorem ipsum dolor, sit amet
                consectetur adipisicing elit. Suscipit, rem. consectetur
            </CardContent>
        </Card>
    );
};

export default HomepageCard;
