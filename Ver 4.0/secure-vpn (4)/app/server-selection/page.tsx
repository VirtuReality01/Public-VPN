"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Check, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

const servers = [
  { id: "us1", name: "United States", location: "New York", flag: "🇺🇸" },
  { id: "nl1", name: "Netherlands", location: "Amsterdam", flag: "🇳🇱" },
  { id: "jp1", name: "Japan", location: "Tokyo", flag: "🇯🇵" },
  { id: "sg1", name: "Singapore", location: "Singapore", flag: "🇸🇬" },
  { id: "uk1", name: "United Kingdom", location: "London", flag: "🇬🇧" },
  { id: "de1", name: "Germany", location: "Frankfurt", flag: "🇩🇪" },
  { id: "ca1", name: "Canada", location: "Toronto", flag: "🇨🇦" },
  { id: "au1", name: "Australia", location: "Sydney", flag: "🇦🇺" },
]

export default function ServerSelection() {
  const router = useRouter()
  const [selectedServer, setSelectedServer] = useState("us1")

  const handleServerSelect = (serverId: string) => {
    setSelectedServer(serverId)
  }

  const handleSave = () => {
    // In a real app, this would save the selection to state/context/storage
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4 flex items-center gap-2 text-slate-300 hover:text-white"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <span>Select Server</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400 mb-4">
              Choose a server location to connect to. Servers closer to your physical location will generally provide
              better performance.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {servers.map((server) => (
                <div
                  key={server.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                    selectedServer === server.id
                      ? "bg-slate-700 border border-emerald-500/50"
                      : "bg-slate-700 border border-transparent hover:border-slate-600",
                  )}
                  onClick={() => handleServerSelect(server.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{server.flag}</div>
                    <div>
                      <p className="font-medium">{server.name}</p>
                      <p className="text-sm text-slate-400">{server.location}</p>
                    </div>
                  </div>

                  {selectedServer === server.id && <Check className="h-5 w-5 text-emerald-500" />}
                </div>
              ))}
            </div>

            <Button className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
              Save Selection
            </Button>
          </CardContent>
        </Card>

        <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-4">
          <h3 className="text-sm font-medium text-slate-300 mb-2">Server Selection Tips</h3>
          <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
            <li>Choose servers closer to your location for better speed</li>
            <li>Some websites may be region-restricted, so select a server in the appropriate country</li>
            <li>If a server is slow, try switching to another in a different location</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

