import VpnDashboard from "@/components/vpn-dashboard"
import ShareLink from "@/components/share-link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">SecureVPN</h1>
        <p className="text-slate-300 mb-8">Multi-layer encrypted VPN with OJAS protection</p>
        <VpnDashboard />

        <div className="mt-12 p-4 bg-slate-800 rounded-lg border border-slate-700">
          <ShareLink />
        </div>
      </div>
    </main>
  )
}

