import { Badge, Card, CardHeader, ExpandableText, } from "@ui5/webcomponents-react"

type DashboardCardProps={
  header:string,
  description:string,
};

const DashboardCards = ({header,description}:DashboardCardProps) => {
  return (
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
    width: '1000px'
  }}
>
<ExpandableText
				maxCharacters={500}
				className="text-center">
				{description}
			</ExpandableText>
</Card>
  )
}

export default DashboardCards