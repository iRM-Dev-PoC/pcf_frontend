import ActivityCard from "@/components/ActivityCard";
import DashboardCards from "@/components/DashboardCards";
import RiskFactor from "@/components/RiskFactor";
import type { FCLLayout } from "@ui5/webcomponents-react";

const DashboardLayout = ({ layout }: { layout: FCLLayout }) => {
    return (
        <div className="m-0 grid grid-cols-2 gap-x-2 self-center border-2 border-orange-700 p-2">
            <div className=" m-0 grid grid-rows-2 border-2 p-0">
                <div className="border-2 border-pink-400">
                    <ActivityCard
                        description="Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
                        title="Lorem ipsum dolor sit amet."
                    />
                </div>

                <div className="grid grid-cols-3 gap-x-2 border-2 border-pink-400">
                    <DashboardCards
                        count={5000}
                        description="Number of Exceptions in Report"
                        header="Exception"
                    />

                    <DashboardCards
                        count={5000}
                        description="Total Number of Rows in Base Data"
                        header="Base"
                    />

                    <DashboardCards
                        count={5000}
                        description="Deviation Between Total Rows and Exception"
                        header="Deviation"
                    />
                </div>
            </div>
            <div className="border-2 border-pink-400">
                <RiskFactor value={80} layout={layout} />
            </div>
        </div>
    );
};

export default DashboardLayout;
