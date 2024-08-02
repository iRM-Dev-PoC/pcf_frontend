import React, { useState } from 'react';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';
import { pivotData } from '@/lib/pivotData';
import { Card } from '@ui5/webcomponents-react';



const PivotTableExample: React.FC = () => {
  const [state, setState] = useState({ data: pivotData });

  return (
    <div>
    <Card>
      <PivotTableUI
      style ={{Width:"100%"}}
        tableData={pivotData}
        onChange={s => setState(s)}
        {...state}
      />
    </Card>
    </div>
  );
};

export default PivotTableExample;
