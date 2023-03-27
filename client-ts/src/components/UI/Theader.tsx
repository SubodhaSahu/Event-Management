type propType = {
  columns: string[];
};
function Theader({ columns }: propType): JSX.Element {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column} className="text-center">
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Theader;
