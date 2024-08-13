import { Card, ComboBox, ComboBoxItem,TextArea } from '@ui5/webcomponents-react'

const RecalculateModal = () => {
  return (
    <Card className='grid-flow-col space-y-5'>
        <TextArea
          placeholder='User Login'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
       
        <TextArea
          placeholder='Total Price'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
        
        <TextArea
          placeholder='Service Names'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
        
        <ComboBox
          placeholder='Role Code'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onSelectionChange={function _a(){}}
          valueState="None"
        >
         <ComboBoxItem text="ASM_APPLICATION_CONSULTANT_JOB" />
         <ComboBoxItem text="EGP_PRODUCT_MANAGER_JOB" />
        </ComboBox>
        
        <TextArea
          placeholder='Recalculated Price'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
    </Card>
  )
}

export default RecalculateModal
