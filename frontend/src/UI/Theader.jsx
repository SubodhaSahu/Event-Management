import React from 'react';

function Theader({ columns }) { 
    return (
      <thead>
       
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
            ))}
        </tr>
      </thead>
    );
}

export default Theader;
