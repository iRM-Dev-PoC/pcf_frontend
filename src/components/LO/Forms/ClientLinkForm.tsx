import { Card, ComboBox, ComboBoxItem,TextArea } from '@ui5/webcomponents-react'

const ClientLinkForm = () => {
  return (
    <Card className='grid-flow-col space-y-5'>
          <ComboBox
          placeholder='Select Client'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onSelectionChange={function _a(){}}
          valueState="None"
        >
         <ComboBoxItem text="ComboBox Entry 1" />
         <ComboBoxItem text="ComboBox Entry 2" />
         <ComboBoxItem text="ComboBox Entry 3" />
         <ComboBoxItem text="ComboBox Entry 4" />
         <ComboBoxItem text="ComboBox Entry 5" />
        </ComboBox>

        <TextArea
          placeholder='Enter Username'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />

        <TextArea
          placeholder='Enter Password'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
        
        <ComboBox
          placeholder='Select Auth Type'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onSelectionChange={function _a(){}}
          valueState="None"
        >
         <ComboBoxItem text="Monthly" />
         <ComboBoxItem text="Annual" />
        </ComboBox>
        
        <TextArea
          placeholder='Enter Url'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
    </Card>
  )
}

export default ClientLinkForm
