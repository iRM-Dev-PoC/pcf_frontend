import { Card,DateTimePicker,TextArea } from '@ui5/webcomponents-react'

const ClientEditForm = () => {
  return (
    <Card className='grid-flow-col space-y-5'>
         <TextArea
          placeholder='Enter Name'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
       
        <TextArea
          placeholder='Add Description'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
        <TextArea
          placeholder='Enter Functional Currency'
          onChange={function _a(){}}
          onInput={function _a(){}}
          onScroll={function _a(){}}
          onSelect={function _a(){}}
          valueState="None"
        />
       
        <DateTimePicker
        placeholder='Start Date'
        onChange={function _a(){}}
        onInput={function _a(){}}
        onValueStateChange={function _a(){}}
        primaryCalendarType="Gregorian"
        valueState="None"
        />
         <DateTimePicker
        placeholder='End Date'
        onChange={function _a(){}}
        onInput={function _a(){}}
        onValueStateChange={function _a(){}}
        primaryCalendarType="Gregorian"
        valueState="None"
        />

    </Card>
  )
}

export default ClientEditForm
