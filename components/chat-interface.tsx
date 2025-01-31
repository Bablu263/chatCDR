"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { PlusCircle, Home, BookOpen, ChevronLeft, ChevronRight, Menu, Send, Info, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ColumnMap } from "./column-map"
import { ChatMessages } from "./chat-messages"
import { DataSelector } from "./data-selector"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ChatInterface() {
  const [conversations, setConversations] = useState([
    { id: 1, title: "Conversation 1" },
    { id: 2, title: "Conversation 2" },
    { id: 3, title: "Conversation 1" },
    { id: 4, title: "Conversation 2" },
    { id: 5, title: "Conversation 1" },
    { id: 6, title: "Conversation 2" },
    { id: 7, title: "Conversation 1" },
    { id: 8, title: "Conversation 2" },
    { id: 9, title: "Conversation 1" },
    { id: 10, title: "Conversation 2" },
    { id: 11, title: "Conversation 1" },
    { id: 12, title: "Conversation 2" },
  ])
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false)
  const [isRightCollapsed, setIsRightCollapsed] = useState(false)
  const [selectedDatastore, setSelectedDatastore] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Array<{ type: "user" | "ai"; content: string }>>([])

  const exampleQuestions = [
    "What are the high severity vulnerabilities?",
    "Show me compliance issues from last week",
    "List all open security incidents",
    "Summarize the cloud service status",
    "What are the trending security threats?",
  ]

  const toggleLeftSidebar = () => setIsLeftCollapsed(!isLeftCollapsed)
  const toggleRightSidebar = () => setIsRightCollapsed(!isRightCollapsed)

  const handleSendMessage = () => {
    if (!message.trim()) return

    setMessages((prev) => [...prev, { type: "user", content: message }])
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: `Response to: ${message}`,
        },
      ])
    }, 1000)
    setMessage("")
  }

  const handleExampleClick = (question: string) => {
    setMessage(question)
  }

  return (
    <div className="flex h-screen bg-background fullScreen">
      {/* Left Sidebar */}
      <div
        className={cn(
          "relative flex flex-col border-r transition-all duration-300 ease-in-out",
          isLeftCollapsed ? "w-16" : "w-64",
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!isLeftCollapsed ? (
            <Button className="flex-1" variant="secondary" onClick={() => setSelectedDatastore(null)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Conversation
            </Button>
          ) : (
            <Button className="w-full" variant="ghost" size="icon" onClick={() => setSelectedDatastore(null)}>
              <PlusCircle className="h-5 w-5" />
            </Button>
          )}
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {conversations.map((conv) => (
              <Button
                key={conv.id}
                variant="ghost"
                className={cn("w-full justify-start", isLeftCollapsed && "px-2 justify-center")}
              >
                {isLeftCollapsed ? <Menu className="h-4 w-4" /> : conv.title}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className={cn("flex items-center gap-2", isLeftCollapsed && "justify-center")}>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {!isLeftCollapsed && <span className="font-medium">User</span>}
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full border shadow-md bg-background z-50"
          onClick={toggleLeftSidebar}
        >
          {isLeftCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col fullScreen">
        <header className="border-b">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">CDR Data Exploration Chatbot</h1>
              {selectedDatastore && (
                <span className="text-sm text-muted-foreground">You are querying on {selectedDatastore}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Examples
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[300px]">
                {
                selectedDatastore == null ? (
                  <DropdownMenuItem key="default">
                    Please select database
                  </DropdownMenuItem>
                ) : (
                  exampleQuestions.map((question, index) => (
                    <DropdownMenuItem key={index} onClick={() => handleExampleClick(question)}>
                      {question}
                    </DropdownMenuItem>
                  ))
                )
              }              
              </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col">
          {!selectedDatastore ? (
            <div className="p-6">
              <p className="text-center text-muted-foreground mb-6">Please select datastore</p>
              <DataSelector onSelect={setSelectedDatastore} />
            </div>
          ) : (
            <>
              <ChatMessages messages={messages} />
              <div className="border-t p-4">
                <div className="flex gap-2 max-w-4xl mx-auto">
                  <Input
                    placeholder="Enter your question here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Sidebar - Only shown when datastore is selected */}
      {selectedDatastore && (
        <div
          className={cn(
            "relative flex flex-col border-l transition-all duration-300 ease-in-out",
            isRightCollapsed ? "w-16" : "w-80",
          )}
        >
          <div className="p-4 border-b flex items-center justify-between">
            {!isRightCollapsed && (
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Column Map</span>
              </div>
            )}
          </div>

          <ScrollArea className="flex-1">{!isRightCollapsed && <ColumnMap />}</ScrollArea>

          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full border shadow-md bg-background z-50"
            onClick={toggleRightSidebar}
          >
            {isRightCollapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </div>
  )
}

