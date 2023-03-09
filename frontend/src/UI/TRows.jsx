import React from 'react';

function TRows({ data }) { 
    return (
      <tbody>
        {data.map((datum) => (
          <tr key={datum.id}>
         
            <td>{datum.name}</td>
            <td>{datum.address}</td>
            <td>{datum.id}</td>
          </tr>
            ))}
      
      </tbody>
    );
}

export default TRows;
