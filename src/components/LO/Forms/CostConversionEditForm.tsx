import { Card, ComboBox, ComboBoxItem,TextArea } from '@ui5/webcomponents-react'

const CostConversionEditForm = () => {
  return (
    <Card className='grid-flow-col space-y-5'>
          
        <TextArea
          placeholder='Add Currency'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
        <TextArea
          placeholder='Add Code'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
         <TextArea
          placeholder='Add Exchange Rate'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
    </Card>
  )
}

export default CostConversionEditForm
