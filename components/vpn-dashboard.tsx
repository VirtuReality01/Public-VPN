"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, Globe, Download, Power, Wifi, Lock, Server } from "lucide-react"
import { generateConfig } from "@/lib/vpn-config"
import { cn } from "@/lib/utils"
import VpnStatus from "./vpn-status"
import EncryptionLayers from "./encryption-layers"

const servers = [
  { id: "us1", name: "United States", location: "New York", flag: "🇺🇸" },
  { id: "nl1", name: "Netherlands", location: "Amsterdam", flag: "🇳🇱" },
  { id: "jp1", name: "Japan", location: "Tokyo", flag: "🇯🇵" },
  { id: "sg1", name: "Singapore", location: "Singapore", flag: "🇸🇬" },
]

export default function VpnDashboard() {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [selectedServer, setSelectedServer] = useState(servers[0].id)
  const [publicIp, setPublicIp] = useState("")
  const [vpnIp, setVpnIp] = useState("")

  useEffect(() => {
    // Simulate fetching the user's public IP
    const fetchPublicIp = async () => {
      // In a real app, you would call an API like ipify
      setTimeout(() => {
        setPublicIp("203.0.113." + Math.floor(Math.random() * 255))
      }, 1000)
    }

    fetchPublicIp()
  }, [])

  const toggleConnection = async () => {
    if (connected) {
      // Disconnect logic
      setConnected(false)
      setVpnIp("")
    } else {
      // Connect logic
      setConnecting(true)

      // Simulate connection process
      setTimeout(() => {
        setConnecting(false)
        setConnected(true)

        // Set a random VPN IP based on selected server
        const serverPrefix =
          selectedServer === "us1"
            ? "10.0.1."
            : selectedServer === "nl1"
              ? "10.0.2."
              : selectedServer === "jp1"
                ? "10.0.3."
                : "10.0.4."

        setVpnIp(serverPrefix + Math.floor(Math.random() * 255))
      }, 2000)
    }
  }

  const downloadConfig = () => {
    const server = servers.find((s) => s.id === selectedServer)
    const config = generateConfig(server?.name || "")

    // Create a blob and download it
    const blob = new Blob([config], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `wireguard-${selectedServer}-config.conf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const selectedServerObj = servers.find((s) => s.id === selectedServer)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl flex items-center gap-2">
            <Shield className="h-6 w-6 text-emerald-500" />
            VPN Dashboard
          </CardTitle>
          <CardDescription>Secure your connection on public WiFi with multi-layer encryption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  connected ? "bg-emerald-500/20" : "bg-slate-700",
                )}
              >
                <Power className={cn("h-8 w-8 transition-colors", connected ? "text-emerald-500" : "text-slate-400")} />
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  {connecting ? "Connecting..." : connected ? "Connected" : "Disconnected"}
                </h3>
                <p className="text-slate-400">
                  {connected ? `Connected to ${selectedServerObj?.name}` : "Not protected"}
                </p>
              </div>
            </div>

            <Button
              size="lg"
              variant={connected ? "destructive" : "default"}
              className={cn(
                "min-w-[140px]",
                connected ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700",
              )}
              onClick={toggleConnection}
              disabled={connecting}
            >
              {connecting ? "Connecting..." : connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-500" />
            Server Selection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedServer} onValueChange={setSelectedServer} disabled={connected}>
            <SelectTrigger>
              <SelectValue placeholder="Select a server" />
            </SelectTrigger>
            <SelectContent>
              {servers.map((server) => (
                <SelectItem key={server.id} value={server.id}>
                  <div className="flex items-center gap-2">
                    <span>{server.flag}</span>
                    <span>
                      {server.name} - {server.location}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="pt-2">
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={downloadConfig}>
              <Download className="h-4 w-4" />
              Download Configuration
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-emerald-500" />
            Connection Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <VpnStatus connected={connected} publicIp={publicIp} vpnIp={vpnIp} selectedServer={selectedServerObj} />

          <div className="pt-2">
            <h3 className="text-sm font-medium mb-2">Encryption Layers</h3>
            <EncryptionLayers active={connected} />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5 text-yellow-500" />
            Public WiFi Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>This VPN is specifically designed to protect your data on public WiFi networks. When connected:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your traffic is encrypted with multiple layers of protection</li>
              <li>DNS requests are secured to prevent leaks</li>
              <li>Kill switch prevents unprotected connections if VPN drops</li>
              <li>Your real IP address is hidden from websites and services</li>
            </ul>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-4 mt-4">
              <h4 className="text-yellow-500 font-medium flex items-center gap-2">
                <Server className="h-4 w-4" />
                Setup Instructions
              </h4>
              <p className="text-sm mt-2">To use this VPN, you need to:</p>
              <ol className="list-decimal pl-5 text-sm mt-1 space-y-1">
                <li>Download the WireGuard client for your device</li>
                <li>Download the configuration file from this dashboard</li>
                <li>Import the configuration file into the WireGuard client</li>
                <li>Connect using the WireGuard client</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

