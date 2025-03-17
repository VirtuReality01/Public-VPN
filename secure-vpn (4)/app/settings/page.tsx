"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { SettingsIcon, Shield, Wifi, Lock, Power, Download, Trash2, ArrowLeft } from "lucide-react"

export default function Settings() {
  const router = useRouter()
  const [autoConnect, setAutoConnect] = useState(false)
  const [killSwitch, setKillSwitch] = useState(true)
  const [dnsProtection, setDnsProtection] = useState(true)
  const [dataCompression, setDataCompression] = useState(false)
  const [blockTrackers, setBlockTrackers] = useState(true)

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      setAutoConnect(false)
      setKillSwitch(true)
      setDnsProtection(true)
      setDataCompression(false)
      setBlockTrackers(true)
      alert("All settings have been reset to default values.")
    }
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
              <SettingsIcon className="h-5 w-5 text-blue-500" />
              <span>App Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-3">Connection</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <Wifi className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Auto-Connect</p>
                        <p className="text-xs text-slate-400">
                          Automatically connect to VPN when using untrusted WiFi networks
                        </p>
                      </div>
                    </div>
                    <Switch checked={autoConnect} onCheckedChange={setAutoConnect} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <Power className="h-4 w-4 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Kill Switch</p>
                        <p className="text-xs text-slate-400">Block all internet traffic if VPN connection drops</p>
                      </div>
                    </div>
                    <Switch checked={killSwitch} onCheckedChange={setKillSwitch} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-3">Privacy & Security</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <Lock className="h-4 w-4 text-amber-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">DNS Protection</p>
                        <p className="text-xs text-slate-400">Encrypt DNS requests to prevent leaks</p>
                      </div>
                    </div>
                    <Switch checked={dnsProtection} onCheckedChange={setDnsProtection} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <Shield className="h-4 w-4 text-emerald-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Block Trackers</p>
                        <p className="text-xs text-slate-400">Block known tracking and advertising domains</p>
                      </div>
                    </div>
                    <Switch checked={blockTrackers} onCheckedChange={setBlockTrackers} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                        <Download className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Data Compression</p>
                        <p className="text-xs text-slate-400">Compress data to reduce bandwidth usage</p>
                      </div>
                    </div>
                    <Switch checked={dataCompression} onCheckedChange={setDataCompression} />
                  </div>
                </div>
              </div>

              <Button
                variant="destructive"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleReset}
              >
                <Trash2 className="h-4 w-4" />
                <span>Reset All Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-sm text-slate-400">SecureVPN Web v1.0.0</p>
          <p className="text-xs text-slate-500 mt-1">© 2023 SecureVPN Inc.</p>
        </div>
      </div>
    </div>
  )
}

