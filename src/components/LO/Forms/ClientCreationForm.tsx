import React, { useState } from 'react';
import { Button, Card, DateTimePicker, TextArea } from '@ui5/webcomponents-react';

const ClientCreationForm = ({ onSubmit }) => {
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    const newClient = {
      client: { name: clientName },
      description: { client: description },
      functional: { currency: currency },
      start: { date: startDate },
      end: { date: endDate },
    };

    onSubmit(newClient); // Pass the new client back to the parent component
  };

  return (
    <Card className='grid-flow-col space-y-5'>
      <TextArea
        placeholder='Enter Name'
        value={clientName}
        onInput={(e) => setClientName(e.target.value)}
        valueState="None"
      />
      <TextArea
        placeholder='Add Description'
        value={description}
        onInput={(e) => setDescription(e.target.value)}
        valueState="None"
      />
      <TextArea
        placeholder='Enter Functional Currency'
        value={currency}
        onInput={(e) => setCurrency(e.target.value)}
        valueState="None"
      />
      <DateTimePicker
        placeholder='Start Date'
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        primaryCalendarType="Gregorian"
        valueState="None"
      />
      <DateTimePicker
        placeholder='End Date'
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        primaryCalendarType="Gregorian"
        valueState="None"
      />
      <Button design="Emphasized" onClick={handleSubmit}>Submit</Button> {/* Call handleSubmit when clicked */}
    </Card>
  );
};

export default ClientCreationForm;

