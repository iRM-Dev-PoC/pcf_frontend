// DataLoading.tsx
import React, { useEffect, useState } from 'react';

interface DataLoadingProps {
  onDataFetched: (data: any) => void;
}

const DataLoading: React.FC<DataLoadingProps> = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for DataLoading
        const response = await fetch('https://api.example.com/data-loading');
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
    <div>DataLoading</div>
  );
};

export default DataLoading;
