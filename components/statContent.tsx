"use client"

import { HtmlHTMLAttributes } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import { Overview } from "@/components/overview"
  import { Analytics } from "@/components/analytics"
import { useOverviewTab } from "@/store/useOverviewTab";

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    
}

export default function StatContent({ className }: Props) {
    const { name, selectTab } = useOverviewTab()
    
    return (
        <Tabs defaultValue={name} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview" onClick={() => selectTab("overview")}>
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics" onClick={() => selectTab("analytics")}>
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <Overview />
            </TabsContent>
            <TabsContent value="analytics" className="space-y-4">
              <Analytics />
            </TabsContent>
        </Tabs>
    )
}