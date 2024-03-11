import { Badge, Card, CardHeader, ExpandableText, FlexBox, } from "@ui5/webcomponents-react"

type DashboardCardProps={
  header:string,
  description:string,
};


const DashboardCards = ({header,description}:DashboardCardProps) => {
  return (
    <FlexBox
    direction="Row"
    className="gap-x-2 mt-4"
    >
    <Card
       header={
          <CardHeader 
           titleText={header}
           action={<Badge
            onClick={function _a() {}}     
           >
           </Badge>}
          

           />}
    
  style={{
    width: '500px'
  }}
>
<ExpandableText
				maxCharacters={200}
				className="text-center">
				{description}
			</ExpandableText>
</Card>
</FlexBox>
  );
};

export default DashboardCards