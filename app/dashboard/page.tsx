import { Metadata } from "next"
import StatHeader from "@/components/statHeader"
import StatContent from "@/components/statContent"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex-col md:flex">
        <div className="w-full bg-slate-900 h-60">
        </div>
        <div className="flex-1 container space-y-4 pt-6 -mt-52">
          <StatHeader />
          <StatContent />
        </div>
      </div>
    </>
  )
}
