import { Badge, Card, CardHeader, ExpandableText, FlexBox, } from "@ui5/webcomponents-react"

type DashboardCardProps={
  header:string,
  description:string,
  count:number,
  cardcolor:"bg-green-400" | "bg-blue-200"|"bg-yellow-400"|"bg-pink-300"
};

const DashboardCards = ({header,description,cardcolor,count}:DashboardCardProps) => {
  return (
    <FlexBox
    direction="Row"
    className="mt-4 flex-grow"
     >
    <Card
     className={`${cardcolor}`}
     style={{width: '500px'}}
       header={
          <CardHeader 
           titleText={header}
           action={<Badge
            onClick={function _a() {}}     
           >
          {count}
           </Badge>}
            />}
    
>
<ExpandableText
				maxCharacters={200}
				className="text-start mt-2 mb-5 m-3"> 
				{description}
			</ExpandableText>
</Card>
</FlexBox>
  );
};

export default DashboardCards;