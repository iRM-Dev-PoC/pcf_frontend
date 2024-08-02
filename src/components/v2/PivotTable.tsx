// import React, { useState } from 'react';
// import PivotTableUI from 'react-pivottable/PivotTableUI';
// import 'react-pivottable/pivottable.css';
// import { pivotData } from '@/lib/pivotData';
// import { Card } from '@ui5/webcomponents-react';

// const PivotTable: React.FC = () => {
//   const [state, setState] = useState({ data: pivotData });

//   return (
//     <div>
//     <Card>
//       <PivotTableUI
//       style ={{Width:"100%"}}
//         tableData={pivotData}
//         onChange={s => setState(s)}
//         {...state}
//       />
//     </Card>
//     </div>
//   );
// };

// export default PivotTable;

import React, { useState, useEffect } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { Card } from '@ui5/webcomponents-react';

type PivotTableProps = {
  pivotData: any;
};

const isValidPivotData = (data: any) => {
  console.log('inside validation : ', data);
  // Check if data is an array of arrays or an array of objects
  if (Array.isArray(data)) {
    console.log('It Is array!');
    if (data.length === 0) return true; // Empty array is valid
    return Array.isArray(data[0]) || typeof data[0] === 'object';
  }
  return false;
  // return true;
};

const PivotTable: React.FC<PivotTableProps> = ({ pivotData }) => {
  const [state, setState] = useState({ data: [], ...pivotData });

  useEffect(() => {
    if (isValidPivotData(pivotData)) {
      setState({ data: pivotData });
    } else {
      console.error('Invalid pivot data format:', pivotData);
    }
  }, [pivotData]);

  console.log("data xyz", pivotData);

  return (
    <div>
      <Card className='h-full'>
        <PivotTableUI
          style={{ width: "100%" }}
          onChange={s => setState(s)}
          {...state}
        />
      </Card>
    </div>
  );
};

export default PivotTable;

