import {
    Badge,
    Card,
    CardHeader,
    ExpandableText,
    FlexBox,
} from "@ui5/webcomponents-react";

type DashboardCardProps = {
    header: "Base" | "Exception" | "Deviation";
    count: number;
    description:
        | "Total Number of Rows in Base Data"
        | "Number of Exceptions in Report"
        | "Deviation Between Total Rows and Exception";
};

const DashboardCards = ({ header, count, description }: DashboardCardProps) => {
    return (
        <FlexBox direction="Row" className="mt-1 grow pb-2">
            <Card
                header={
                    <CardHeader
                        titleText={header}
                        action={
                            <Badge
                                colorScheme={
                                    header === "Base"
                                        ? "7"
                                        : header === "Exception"
                                          ? "1"
                                          : "2"
                                }
                            >
                                {count}
                            </Badge>
                        }
                    />
                }
            >
                <ExpandableText className="p-2 text-lg" maxCharacters={50}>
                    {description}
                </ExpandableText>
            </Card>
        </FlexBox>
    );
};

export default DashboardCards;
