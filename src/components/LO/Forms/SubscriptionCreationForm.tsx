import { TextArea,Card } from "@ui5/webcomponents-react"


const SubscriptionCreationForm = () => {
  return (
    <div className='grid-flow-col space-y-3'>
        <h1>Subscription Name</h1>
    <TextArea
      placeholder='Add Subscription'
      onChange={function _a(){}}
      onInput={function _a(){}}
      onScroll={function _a(){}}
      onSelect={function _a(){}}
      valueState="None"
    />
</div>
  )
}

export default SubscriptionCreationForm
