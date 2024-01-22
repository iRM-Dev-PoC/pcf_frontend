// ControlFamily.tsx
import React, { useEffect, useState } from 'react';

interface ControlFamilyProps {
  onDataFetched: (data: any) => void;
}

const ControlFamily: React.FC<ControlFamilyProps> = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for ControlFamily
        const response = await fetch('https://api.example.com/control-family');
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
    <div>ControlFamily</div>
  );
};

export default ControlFamily;
