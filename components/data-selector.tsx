import { Button } from "@/components/ui/button"

interface DataSelectorProps {
  onSelect: (datastore: string) => void
}

export function DataSelector({ onSelect }: DataSelectorProps) {
  const vulnerabilityData = [
    { id: 1, label: "Vul 1" },
    { id: 2, label: "Vul 2" },
    { id: 3, label: "Vul 3" },
  ]

  const cloudServiceData = [
    { id: 1, label: "CS 1" },
    { id: 2, label: "CS 2" },
    { id: 3, label: "CS 3" },
    { id: 4, label: "CS 4" },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Vulnerability Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vulnerabilityData.map((item) => (
            <Button key={item.id} variant="outline" className="h-12" onClick={() => onSelect(item.label)}>
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">CLOUD Service Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cloudServiceData.map((item) => (
            <Button key={item.id} variant="outline" className="h-12" onClick={() => onSelect(item.label)}>
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

