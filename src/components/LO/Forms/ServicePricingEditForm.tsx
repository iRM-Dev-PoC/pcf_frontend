import { Card, ComboBox, ComboBoxItem,TextArea } from '@ui5/webcomponents-react'

const ServicePriceEditModal = () => {
  return (
    <Card className='grid-flow-col '>
          <ComboBox
          placeholder='Cloud Service'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onSelectionChange={function _a(){}}
          valueState="None"
        >
         <ComboBoxItem text="Oracle Fusion Time and Labor Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Transactional Business Intelligence Enterprise for Human Capital Management Cloud Service - Hosted Employee" />
         <ComboBoxItem text="Oracle Fusion Time and Labor for Projects Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Fusion Supplier Qualification Management Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Fusion Grants Management Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Fusion Product Development Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Fusion Innovation Management Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Fusion Innovation Management Ideation Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Performance Management Cloud Service - Hosted Named Users" />
         <ComboBoxItem text="Enterprise Resource Planning Cloud Service - Hosted Named Users" />
         <ComboBoxItem text="Oracle Fusion Goal Management Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Fusion Performance Management Cloud Service - Hosted Named User" />
         <ComboBoxItem text="Oracle Fusion Financials Cloud Service - Hosted Named User" />
        </ComboBox>
        
        <ComboBox
          placeholder='Select Plan'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onSelectionChange={function _a(){}}
          valueState="None"
        >
         <ComboBoxItem text="Monthly" />
         <ComboBoxItem text="Annual" />
        </ComboBox>
        
        <TextArea
          placeholder='Subscription Price'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
       
        <TextArea
          placeholder='Per Unit Price'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
    </Card>
  )
}

export default ServicePriceEditModal
