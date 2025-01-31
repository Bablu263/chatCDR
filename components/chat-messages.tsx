import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface ChatMessagesProps {
  messages: Array<{
    type: "user" | "ai"
    content: string
  }>
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <ScrollArea className="flex-1 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground p-8 rounded-lg bg-muted/50">
            <p>Start a conversation by typing a message below.</p>
            <p className="text-sm mt-2">
              1. User messages will appear on the right
              <br />
              2. AI responses will appear on the left
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className={cn("flex", message.type === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[80%]",
                  message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                )}
              >
                {message.content}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  )
}

