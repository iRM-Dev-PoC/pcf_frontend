// Dashboard.tsx
import React, { useEffect } from 'react';

interface DashboardProps {
  onDataFetched: (data: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onDataFetched }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for the Dashboard
        const response = await fetch('https://api.example.com/dashboard');
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
    <div>Dashboard</div>
  );
};

export default Dashboard;
