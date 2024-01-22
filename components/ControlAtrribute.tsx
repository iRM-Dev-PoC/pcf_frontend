// ControlAttribute.tsx
import React, { useEffect } from 'react';

interface ControlAttributeProps {
  onDataFetched: (data: any) => void;
}

const ControlAttribute: React.FC<ControlAttributeProps> = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the ControlAttribute
        const response = await fetch('https://api.example.com/control-attribute');
        const data = await response.json();
        
        // Pass the fetched data to the parent component
        onDataFetched(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [onDataFetched]);

  return (
    <div>Control Attribute</div>
  );
};

export default ControlAttribute;
