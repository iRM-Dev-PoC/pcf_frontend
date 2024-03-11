import { Card, CardHeader, Icon, List, StandardListItem } from "@ui5/webcomponents-react"


const RiskFactor = () => {
  return (
    <Card 
    header={<CardHeader avatar={<Icon name="person-placeholder" />} status="3 of 5" subtitleText="Direct Reports" titleText="TeamSpace"/>}
  style={{
    width: '300px'
  }}
    >
     <List>
    <StandardListItem description="Software Architect">
      Richard Wilson
    </StandardListItem>
    <StandardListItem description="Visual Designer">
      Elena Petrova
    </StandardListItem>
    <StandardListItem description="Quality Specialist">
      John Miller
    </StandardListItem>
  </List>
    </Card>

    
  )
}

export default RiskFactor