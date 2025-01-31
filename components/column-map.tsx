interface ColumnData {
  name: string
  explanation: string
}

const columnData: ColumnData[] = [
  { name: "ID", explanation: "Unique identifier for the record" },
  { name: "Severity", explanation: "Level of vulnerability severity" },
  { name: "Status", explanation: "Current status of the vulnerability" },
  { name: "Description", explanation: "Detailed description of the issue" },
  { name: "Created", explanation: "Date when the record was created" },
  { name: "Updated", explanation: "Last modification date" },
  { name: "Owner", explanation: "Person responsible for the record" },
  { name: "Category", explanation: "Type of vulnerability" },
  { name: "ID", explanation: "Unique identifier for the record" },
  { name: "Severity", explanation: "Level of vulnerability severity" },
  { name: "Status", explanation: "Current status of the vulnerability" },
  { name: "Description", explanation: "Detailed description of the issue" },
  { name: "Created", explanation: "Date when the record was created" },
  { name: "Updated", explanation: "Last modification date" },
  { name: "Owner", explanation: "Person responsible for the record" },
  { name: "Category", explanation: "Type of vulnerability" },
]

export function ColumnMap() {
  return (
    <div className="p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left pb-2 font-medium">Name</th>
            <th className="text-left pb-2 font-medium">Explanation</th>
          </tr>
        </thead>
        <tbody>
          {columnData.map((column, index) => (
            <tr key={index} className="border-b last:border-0">
              <td className="py-2 pr-4 text-sm">{column.name}</td>
              <td className="py-2 text-sm text-muted-foreground">{column.explanation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

