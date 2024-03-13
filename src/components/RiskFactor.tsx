
import { Card, CardHeader, Icon, } from "@ui5/webcomponents-react"
import { RadialChart } from "@ui5/webcomponents-react-charts"
const RiskFactor = () => {
  return (
    <Card 
    header={<CardHeader avatar={<Icon name="person-placeholder" />}  titleText="Risk Factor"/>}
    style={{width :"30%"}}
    >
    
    <RadialChart
  chartConfig={{innerRadius:"145"}}
  displayValue="50%"
  onClick={function _a(){}}
  onDataPointClick={function _a(){}}
  value={50}
/>
    </Card>   
  )
}

export default RiskFactor;