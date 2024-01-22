// MainScreen.tsx
import React, { useEffect, useState } from "react";

interface MainScreenProps {
  selectedNavItem: string | null;
}

const MainScreen: React.FC<MainScreenProps> = ({ selectedNavItem }) => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data based on the selectedNavItem
        if (selectedNavItem === "#dashboard") {
          const response = await fetch("https://api.example.com/dashboard");
          const dashboardData = await response.json();
          setData(dashboardData);
        } else if (selectedNavItem === "#dataload") {
          const response = await fetch("https://api.example.com/dataload");
          const dataloadData = await response.json();
          setData(dataloadData);
        } else if (selectedNavItem === "#control") {
          const response = await fetch("https://api.example.com/control");
          const controlData = await response.json();
          setData(controlData);
        } else if (selectedNavItem === "#group") {
          const response = await fetch("https://api.example.com/group");
          const groupData = await response.json();
          setData(groupData);
        } else {
          // Handle other cases or default behavior
          setData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data when selectedNavItem changes
    if (selectedNavItem) {
      fetchData();
    }
  }, [selectedNavItem]);

  return (
    <div className="h-auto w-[100%]">
      {/* Display the fetched data */}
      {data && (
        <div>
          <h2>Data for {selectedNavItem}</h2>
          {/* Display data in a way that makes sense for your application */}
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MainScreen;
