"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Settings, Server, Lock, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import ConnectionButton from "./connection-button"
import StatusCard from "./status-card"
import OjasStatusIndicator from "./ojas-status-indicator"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

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

export default function VpnDashboard() {
  const router = useRouter()
  const isDesktop = useMediaQuery("(min-width: 768px)")

  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [publicIp, setPublicIp] = useState("")
  const [vpnIp, setVpnIp] = useState("")
  const [selectedServer, setSelectedServer] = useState(servers[0])
  const [ojasLayers, setOjasLayers] = useState(1)
  const [attackDetected, setAttackDetected] = useState(false)
  const [pulseAnimation, setPulseAnimation] = useState(false)

  useEffect(() => {
    fetchPublicIp()
  }, [])

  useEffect(() => {
    if (attackDetected) {
      setPulseAnimation(true)

      // Simulate OJAS responding to attack by adding layers
      const interval = setInterval(() => {
        if (ojasLayers < 7) {
          setOjasLayers((prev) => prev + 1)
        } else {
          clearInterval(interval)
          setTimeout(() => {
            setAttackDetected(false)
            setPulseAnimation(false)
          }, 2000)
        }
      }, 800)

      return () => clearInterval(interval)
    }
  }, [attackDetected, ojasLayers])

  const fetchPublicIp = async () => {
    try {
      // In a real app, this would call an IP lookup service
      setTimeout(() => {
        const octet1 = Math.floor(Math.random() * 223) + 1
        const octet2 = Math.floor(Math.random() * 256)
        const octet3 = Math.floor(Math.random() * 256)
        const octet4 = Math.floor(Math.random() * 256)

        setPublicIp(`${octet1}.${octet2}.${octet3}.${octet4}`)
      }, 1000)
    } catch (error) {
      console.error("Failed to fetch IP:", error)
      setPublicIp("Unable to fetch")
    }
  }

  const toggleConnection = async () => {
    if (connected) {
      // Disconnect logic
      setConnected(false)
      setVpnIp("")
      setOjasLayers(1)
    } else {
      // Connect logic
      setConnecting(true)

      try {
        // Simulate connection process
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Set a random VPN IP based on selected server
        const serverPrefix =
          selectedServer.id === "us1"
            ? "10.0.1."
            : selectedServer.id === "nl1"
              ? "10.0.2."
              : selectedServer.id === "jp1"
                ? "10.0.3."
                : selectedServer.id === "sg1"
                  ? "10.0.4."
                  : selectedServer.id === "uk1"
                    ? "10.0.5."
                    : selectedServer.id === "de1"
                      ? "10.0.6."
                      : selectedServer.id === "ca1"
                        ? "10.0.7."
                        : "10.0.8."

        const lastOctet = Math.floor(Math.random() * 255) + 1
        setVpnIp(serverPrefix + lastOctet)

        setConnecting(false)
        setConnected(true)

        // Simulate random attack detection after connection
        if (Math.random() > 0.5) {
          setTimeout(
            () => {
              simulateAttackDetection()
            },
            10000 + Math.random() * 20000,
          )
        }
      } catch (error) {
        setConnecting(false)
        alert("Failed to establish VPN connection")
      }
    }
  }

  const simulateAttackDetection = () => {
    if (connected) {
      setAttackDetected(true)
      alert("OJAS has detected a potential attack and is adding additional encryption layers for protection.")
    }
  }

  const navigateToServerSelection = () => {
    router.push("/server-selection")
  }

  const navigateToEncryptionDetails = () => {
    router.push("/encryption-details")
  }

  const navigateToOjasInfo = () => {
    router.push("/ojas-info")
  }

  const navigateToSettings = () => {
    router.push("/settings")
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-transform",
                  pulseAnimation ? "animate-pulse" : "",
                  connected ? "bg-emerald-500/20" : "bg-slate-700",
                )}
              >
                <Shield
                  className={cn("h-8 w-8 transition-colors", connected ? "text-emerald-500" : "text-slate-400")}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  {connecting ? "Connecting..." : connected ? "Protected" : "Not Protected"}
                </h2>
                <p className="text-slate-400">
                  {connected ? `Connected to ${selectedServer.name}` : "Your connection is not secure"}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto">
              <ConnectionButton connected={connected} connecting={connecting} onPress={toggleConnection} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatusCard
          title="Connection Details"
          icon={<Server className="h-5 w-5 text-blue-500" />}
          onPress={navigateToServerSelection}
          disabled={connected}
        >
          <div className="mb-4">
            <p className="text-base font-medium flex items-center gap-2">
              <span>{selectedServer.flag}</span> {selectedServer.name}
            </p>
            <p className="text-sm text-slate-400">{selectedServer.location}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">Public IP:</span>
              <code className="bg-slate-900 px-2 py-1 rounded text-xs">{publicIp || "Loading..."}</code>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">VPN IP:</span>
              <code className="bg-slate-900 px-2 py-1 rounded text-xs">{connected ? vpnIp : "Not connected"}</code>
            </div>
          </div>
        </StatusCard>

        <StatusCard
          title="OJAS Encryption"
          icon={<Lock className="h-5 w-5 text-emerald-500" />}
          onPress={navigateToEncryptionDetails}
          rightIcon={<Info className="h-4 w-4 text-slate-400" />}
          onRightIconPress={navigateToOjasInfo}
        >
          <OjasStatusIndicator active={connected} layers={ojasLayers} attackDetected={attackDetected} />
        </StatusCard>
      </div>

      <Button
        variant="outline"
        className="flex items-center gap-2 mt-4 w-full md:w-auto md:self-center"
        onClick={navigateToSettings}
      >
        <Settings className="h-4 w-4" />
        <span>Settings</span>
      </Button>

      {/* Mobile-friendly footer with browser compatibility info */}
      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-sm font-medium text-slate-300 mb-2">Browser Compatibility</h3>
        <p className="text-xs text-slate-400 mb-2">
          This web-based VPN works on all modern browsers including Chrome, Firefox, Safari, and Edge.
        </p>
        <p className="text-xs text-slate-400">
          For optimal performance on mobile devices, we recommend using Safari on iOS and Chrome on Android.
        </p>
      </div>
    </div>
  )
}

