import { Card, ComboBox, ComboBoxItem,TextArea } from '@ui5/webcomponents-react'

const SapServiceEditForm = () => {
  return (
    <Card className='grid-flow-col space-y-5'>
         <TextArea
          placeholder='Enter Part Number'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
        <TextArea
          placeholder='Enter Cloud Services'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />

        <TextArea
          placeholder='Enter Process'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
    </Card>
  )
}

export default SapServiceEditForm
